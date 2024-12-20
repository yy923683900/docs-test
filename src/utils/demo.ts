import { Octokit } from "octokit";
import config from "../../env";
import { dayjs } from "element-plus";

const BASE_BRANCH = "main";

const COMMON_HEADERS = {
  "X-GitHub-Api-Version": "2022-11-28",
};

const owner = config.GITHUB_OWNER;
const repo = config.GITHUB_REPO;
const committer = {
  name: config.GITHUB_AUTHOR_NAME,
  email: config.GITHUB_AUTHOR_EMAIL,
};

const octokit = new Octokit({
  auth: getGithubToken(),
});

export function getGithubToken() {
  return config.GITHUB_AUTH_TOKEN;
}

export function buildBranch() {
  return `feature/docs-${dayjs().format("YYYY-MM-DD-HH-mm")}`;
}

/**
 * 获取分支信息
 * @returns 分支信息
 */
export async function getBranch() {
  const resp = await octokit.request(
    "GET /repos/{owner}/{repo}/branches/{branch}",
    {
      owner,
      repo,
      branch: `refs/heads/${BASE_BRANCH}`,
      headers: {
        ...COMMON_HEADERS,
      },
    }
  );
  return resp;
}

export async function createBranch() {
  const resp = await getBranch();
  const branch = buildBranch();
  await octokit.request("POST /repos/{owner}/{repo}/git/refs", {
    owner,
    repo,
    ref: `refs/heads/${branch}`,
    sha: resp.data.commit.sha,
    headers: {
      ...COMMON_HEADERS,
    },
  });
  return branch;
}

export async function getFileSha(path: string) {
  const resp = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner,
      repo,
      path,
      headers: {
        ...COMMON_HEADERS,
      },
    }
  );
  return resp.data.sha;
}

function encodeToBase64(input: string) {
  // 将输入字符串转换为 UTF-8 编码的字节数组
  const utf8Encoder = new TextEncoder();
  const utf8Bytes = utf8Encoder.encode(input);

  // 创建一个二进制数组缓冲区
  const binaryString = "";
  const len = utf8Bytes.byteLength;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = utf8Bytes[i];
  }

  // 将二进制数据转换为 Base64 编码
  const base64EncodedString = btoa(String.fromCharCode(...bytes));
  return base64EncodedString;
}

export async function updateFile(
  branch: string,
  path: string,
  content: string
) {
  const base64Content = encodeToBase64(content);
  const sha = await getFileSha(path);
  await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    owner,
    repo,
    path,
    message: "docs: update file",
    content: base64Content,
    sha,
    branch,
    committer,
    headers: {
      ...COMMON_HEADERS,
    },
  });
}

export async function createPullRequest(path: string, content: string) {
  const branch = await createBranch();
  await updateFile(branch, path, content);
  const res = await octokit.request("POST /repos/{owner}/{repo}/pulls", {
    owner,
    repo,
    title: "Amazing new feature",
    body: "Please pull these awesome changes in!",
    head: `refs/heads/${branch}`,
    base: `refs/heads/${BASE_BRANCH}`,
    headers: {
      ...COMMON_HEADERS,
    },
  });
  return res;
}

// import axios from 'axios';

// const OWNER = 'your-owner';
// const REPO = 'your-repo';
// const BASE_BRANCH = 'main'; // 目标分支
// const NEW_BRANCH = 'new-feature'; // 新分支名称
// const COMMIT_MESSAGE = 'Add new feature'; // 提交信息
// const PR_TITLE = 'New Feature PR'; // PR 标题
// const PR_BODY = 'This is a new feature.'; // PR 描述
// const GITHUB_TOKEN = 'your-github-token'; // GitHub 个人访问令牌

// const githubApiUrl = 'https://api.github.com';

// // 获取仓库引用
// async function getRepoRef(branch: string): Promise<string> {
//     const response = await axios.get(`${githubApiUrl}/repos/${OWNER}/${REPO}/git/refs/heads/${branch}`, {
//         headers: {
//             'Authorization': `token ${GITHUB_TOKEN}`,
//             'Accept': 'application/vnd.github.v3+json'
//         }
//     });
//     return response.data.object.sha;
// }

// // 创建新分支
// async function createBranch(baseSha: string, newBranch: string): Promise<void> {
//     await axios.post(`${githubApiUrl}/repos/${OWNER}/${REPO}/git/refs`, {
//         ref: `refs/heads/${newBranch}`,
//         sha: baseSha
//     }, {
//         headers: {
//             'Authorization': `token ${GITHUB_TOKEN}`,
//             'Accept': 'application/vnd.github.v3+json',
//             'Content-Type': 'application/json'
//         }
//     });
// }

// // 创建一个新文件（或更新现有文件）
// async function createOrUpdateFile(branch: string, path: string, content: string, message: string): Promise<void> {
//     const base64Content = Buffer.from(content).toString('base64');
//     const sha = await getRepoRef(branch);

//     await axios.put(`${githubApiUrl}/repos/${OWNER}/${REPO}/contents/${path}`, {
//         message,
//         content: base64Content,
//         sha,
//         branch: branch
//     }, {
//         headers: {
//             'Authorization': `token ${GITHUB_TOKEN}`,
//             'Accept': 'application/vnd.github.v3+json',
//             'Content-Type': 'application/json'
//         }
//     });
// }

// // 创建 Pull Request
// async function createPullRequest(base: string, head: string, title: string, body: string): Promise<void> {
//     await axios.post(`${githubApiUrl}/repos/${OWNER}/${REPO}/pulls`, {
//         title,
//         body,
//         base,
//         head,
//         maintainer_can_modify: true
//     }, {
//         headers: {
//             'Authorization': `token ${GITHUB_TOKEN}`,
//             'Accept': 'application/vnd.github.v3+json',
//             'Content-Type': 'application/json'
//         }
//     });
// }

// (async () => {
//     try {
//         // 获取基础分支的 SHA
//         const baseSha = await getRepoRef(BASE_BRANCH);

//         // 创建新分支
//         await createBranch(baseSha, NEW_BRANCH);

//         // 在新分支上创建一个新文件（示例）
//         await createOrUpdateFile(NEW_BRANCH, 'README.md', '# New Feature\nThis is a new feature.', COMMIT_MESSAGE);

//         // 创建 Pull Request
//         await createPullRequest(BASE_BRANCH, NEW_BRANCH, PR_TITLE, PR_BODY);

//         console.log('Pull Request created successfully!');
//     } catch (error) {
//         console.error('Error creating Pull Request:', error.response?.data || error.message);
//     }
// })();
