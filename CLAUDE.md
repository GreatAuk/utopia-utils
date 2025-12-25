# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Utopia-Utils 是一个 TypeScript monorepo 工具库集合，使用 pnpm workspaces 管理多个子包。主要包含以下子包：
- `@utopia-utils/core` - 核心工具函数集合（数组、对象、函数、Promise、字符串、数值等）
- `@utopia-utils/dom` - DOM 和浏览器环境相关工具
- `@utopia-utils/tree` - 树结构操作工具
- `@utopia-utils/vueuse` - Vue 3 Composables
- `@utopia-utils/share` - 类型判断和共享工具
- `@utopia-utils/cli` - CLI 工具函数
- `@utopia-utils/type` - 类型定义

## 常用命令

### 构建和开发
```bash
# 构建所有包（会先检查依赖是否过时）
pnpm build

# 开发模式运行示例项目
pnpm example

# 清理所有包的构建产物
pnpm clean

# 类型检查
pnpm typecheck
```

### 测试
```bash
# 运行所有测试（watch 模式）
pnpm test

# 运行单次测试
pnpm test:once

# 测试单个文件
pnpm test:once packages/dom/src/styleUtil.test.ts

# 生成测试覆盖率报告
pnpm coverage
```

### 代码质量
```bash
# 运行 linter（oxlint）
pnpm lint

# 自动修复 lint 问题
pnpm lint:fix
```

### 发布
```bash
# 版本发布（会先检查依赖是否过时）
pnpm release
```

## 项目架构

### Monorepo 结构
- 使用 **pnpm workspaces** 管理多包
- 使用 **Turbo** 进行构建优化和缓存
- 使用 **tsdown** 构建各个子包
- 使用 **Vitest** 进行单元测试

### 构建系统
- 每个子包都有独立的 `tsdown.config.ts` 配置
- 构建产物输出到各包的 `dist/` 目录
- 支持 sourcemap、类型声明文件生成
- 生产环境自动 minify

### 依赖管理
- 使用 `stale-dep` 在构建、测试、发布前自动检查过时依赖
- 子包之间使用 `workspace:*` 协议互相引用
- 强制使用 pnpm（preinstall hook）

## 测试规范

### 测试文件命名和位置
- 测试文件命名：`[function-name].test.ts`
- **测试文件与源文件放在同一目录下**
- 使用 TypeScript 编写

### 测试框架配置
- 使用 **Vitest**，启用全局变量模式（`globals: true`）
- **DOM 相关测试自动使用 happy-dom 环境**（`packages/dom/**` 下的所有测试）
- 非 DOM 测试使用默认 node 环境
- 如果在非 `packages/dom` 下需要 DOM 环境，在文件头部添加：`/** @vitest-environment happy-dom */`

### 测试用例结构
- 使用 `describe` 描述测试套件，命名与被测试函数相同
- 使用 `it` 描述具体测试用例
- 测试分类：正常路径、边界情况、错误处理、类型安全
- 遵循 AAA 模式：Arrange（准备）、Act（执行）、Assert（断言）

### Mock 和清理
```typescript
import { describe, expect, it, afterEach, vi } from 'vitest'

describe('functionName', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // 测试用例...
})
```

### 测试覆盖率
- 核心业务逻辑应达到 100% 覆盖率
- 覆盖所有分支和边界条件
- `index.ts` 导出文件被排除在覆盖率统计之外

## 代码风格

### 注释规范
- 在 JS/TS 代码中，变量名和函数名使用 `/** */` 进行注释
- 测试代码中使用多行注释格式：`/* 注释内容 */`

### 类型安全
- 启用严格模式（`strict: true`）
- 启用 `isolatedDeclarations` 用于类型声明
- 所有导出的函数都应有完整的类型定义

### 第三方库复用
`@utopia-utils/core` 重新导出了以下优秀的第三方库：
- `debounce` / `throttle` - 来自 throttle-debounce
- `Cookies` - 来自 js-cookie
- `mitt` - 事件发布/订阅
- `merge` / `merge.all` - 来自 deepmerge
- `NP` - 来自 number-precision

## 开发注意事项

### 新增工具函数
1. 在对应子包的 `src/` 目录下创建功能文件
2. 在同一目录创建对应的 `.test.ts` 测试文件
3. 在子包的 `src/index.ts` 中导出
4. 如果是 core 包，需要在根目录 README.md 中添加 API 文档

### 树结构工具的特点
所有 tree utils 支持自定义字段名（`fieldNames`）：
```typescript
interface FieldNames {
  id?: string
  children?: string
  parentId?: string
}
```

### Node 版本要求
- Node >= 22.16.0
- pnpm >= 10.8.0

### 构建输出
- 所有包输出 ESM 格式（`.mjs`）
- 类型定义文件后缀为 `.d.mts`
- 使用 `fixedExtension: true` 确保扩展名一致性
