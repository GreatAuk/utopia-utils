# Repository Guidelines

## 项目结构与模块组织
- 仓库使用 pnpm workspace 管理多包，所有源码位于 `packages/*/src`，各包自带 `package.json` 与 `tsdown.config.ts`，保持 API 在主入口 `index.ts` 汇出。
- 通用示例与手动验证放在 `example/`（Vite + Vue），端到端脚本置于 `example/e2e`；公共配置如 `tsconfig.json`、`turbo.json` 位于根目录。
- 生成产物写入各包 `dist/`，不要直接修改；测试覆盖率报告在 `coverage/`，可用于追踪回归。
- 其中 `packages/shared` 放置跨包共用工具函数，`packages/type` 定义全局类型，重复功能可以直接引用。

## 构建、测试与开发命令
- 初次安装使用 `pnpm install`（遵循 `preinstall` only-allow 约束，不要用 npm/yarn）。
- 本地快速构建执行 `pnpm build`，该命令会先运行 `stale-dep` 检查并通过 `turbo` 构建全部包；清理产物使用 `pnpm clean`。
- 单元测试使用 `pnpm test` 进入 watch 模式；CI 等静态运行用 `pnpm test:once`，覆盖率报告用 `pnpm coverage`。
- 类型检查执行 `pnpm typecheck`；想要调试示例，运行 `pnpm example` 启动 Vite dev server。

## 编码风格与命名约定
- 代码统一采用 TypeScript ESM，缩进 2 空格，导出有序聚合于包入口；共用类型放在 `packages/type`。
- 运行 `pnpm lint` 调用 `oxlint` 检查语法与复杂度；导入顺序采纳现有配置，`oxlint` 若提示顺序问题可忽略。
- 新增函数或变量时保持 `/** ... */` JSDoc 注释，必要时增加 `@example`；异步后端接口调用必须包裹 `try/catch` 并记录错误。
- 公有 API 名称使用动词短语或名词短语，如 `createPoll`、`isValidUrl`，内部工具以下划线前缀标记。

## 测试规范
- 单元测试与实现同目录，文件命名 `*.test.ts`，使用 `vitest` 与 `happy-dom` 模拟浏览器；新增 util 需覆盖成功与失败路径。
- 回归缺陷需添加重现测试并覆盖边界，如空输入与异常分支；提交前运行 `pnpm test:once` 确认无 snapshot 漏洞。
- 目标是维持现有覆盖率（参考 `coverage/lcov-report`），新增模块若覆盖度低于 85% 应在 PR 中说明。

## 提交与合并请求
- 参考当前历史，使用 Conventional Commits：`fix(scope): 描述`、`feat: 描述`、`chore: 描述`；必要时补充中文说明确保上下文清晰。
- PR 描述需概述目的、列出关键变更、附带测试结果（命令与输出概述），界面改动附截图或录屏。
- 如果变更影响多包，请在描述中列明受影响的 package，以及是否需要同步发布；关联 issue 使用关键字 `close #id`。

## 安全与环境配置
- 推荐 Node.js >= 22.16.0、pnpm >= 10.8.0，并在 clone 后运行 `pnpm install --frozen-lockfile` 以保持依赖一致。
- 避免直接修改 `dist/` 或生成文件，必要环境变量放入 `example/.env` 或本地 `.env.local`，切勿提交密钥；脚手架命令如 `stale-dep -u` 会自动刷新依赖，保持执行。
