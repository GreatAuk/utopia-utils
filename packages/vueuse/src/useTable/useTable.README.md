# useTable Hook 使用指南

## 概述

`useTable` 是一个用于管理表格状态的 Vue 3 组合式函数，简单封装，提供了分页、排序、过滤和搜索功能的完整解决方案。

## 功能特性

- ✅ 分页管理（页码、页大小）
- ✅ 排序功能（字段、排序方式）
- ✅ 过滤器状态管理
- ✅ 表单状态管理
- ✅ 两种搜索模式（简单模式/高级模式）
- ✅ 防抖搜索
- ✅ 表单重置功能

## 类型定义

```typescript
type UseTableOptions<Filters> = {
  defaultFilters?: Filters;
  /** 默认分页数量 @default 10 */
  defaultPageSize?: number;
  /** searchType 为 simple 时，表单项更新的 debounce 时间 @default 400 */
  searchDebounce?: number;
  /** 表单类型 @default 'advance' */
  searchType?: 'advance' | 'simple';
};

type TableSort = {
  field: string;
  order?: 'ascend' | 'descend' | null;
};
```

## 参数说明

| 参数 | 类型 | 默认值 | 描述 |
|------|------|-------|------|
| `defaultFilters` | `Filters` | `{}` | 默认过滤器值 |
| `defaultPageSize` | `number` | `10` | 默认每页显示数量 |
| `searchDebounce` | `number` | `400` | 简单搜索模式下的防抖时间（毫秒） |
| `searchType` | `'advance' \| 'simple'` | `'advance'` | 搜索模式类型 |

### 搜索模式说明

- **simple**: 表单项更新时自动触发搜索，适用于实时搜索场景
- **advance**: 需要手动调用搜索方法，适用于复杂查询场景

## 返回值

```typescript
{
  pageSize: Ref<number>;           // 当前页大小
  currentPage: Ref<number>;        // 当前页码
  sort: ShallowRef<TableSort>;     // 排序状态
  filters: Ref<Filters>;           // 过滤器状态
  search: {
    submit: () => void;            // 提交搜索
    reset: () => void;             // 重置表单
    formState: Ref<Filters>;       // 表单状态
  };
}
```

## 基础用法

### 1. 简单模式（实时搜索）

```vue
<template>
  <div>
    <!-- 搜索表单 -->
    <el-form :model="search.formState">
      <el-form-item label="用户名">
        <el-input v-model="search.formState.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="search.formState.status" placeholder="请选择状态">
          <el-option label="启用" value="1" />
          <el-option label="禁用" value="0" />
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData">
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="status" label="状态" />
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>

<script setup lang="ts">
import { useTable } from '@/hooks/useTable';

interface SearchFilters {
  username?: string;
  status?: string;
}

/* 初始化 useTable，使用简单搜索模式 */
const { pageSize, currentPage, filters, search } = useTable<SearchFilters>({
  searchType: 'simple',
  defaultPageSize: 20,
  searchDebounce: 300,
  defaultFilters: {
    username: '',
    status: '',
  },
});

/* 监听 filters 变化，发起 API 请求 */
watchEffect(() => {
  fetchTableData();
});

const fetchTableData = async () => {
  const params = {
    page: currentPage.value,
    size: pageSize.value,
    ...filters.value,
  };

  /* 发起 API 请求 */
  const response = await getUserList(params);
  tableData.value = response.data;
  total.value = response.total;
};
</script>
```

### 2. 高级模式（手动搜索）

```vue
<template>
  <div>
    <!-- 搜索表单 -->
    <el-form :model="search.formState" inline>
      <el-form-item label="用户名">
        <el-input v-model="search.formState.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="search.formState.createTime"
          type="daterange"
          placeholder="请选择时间范围"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search.submit()">搜索</el-button>
        <el-button @click="search.reset()">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格内容... -->
  </div>
</template>

<script setup lang="ts">
import { useTable } from '@/hooks/useTable';

interface SearchFilters {
  username?: string;
  createTime?: [string, string];
}

/* 初始化 useTable，使用高级搜索模式 */
const { pageSize, currentPage, sort, filters, search } = useTable<SearchFilters>({
  searchType: 'advance',
  defaultFilters: {
    username: '',
    createTime: undefined,
  },
});

/* 监听 filters、分页、排序变化 */
watchEffect(() => {
  fetchTableData();
});

const fetchTableData = async () => {
  const params = {
    page: currentPage.value,
    size: pageSize.value,
    sortField: sort.value?.field,
    sortOrder: sort.value?.order,
    ...filters.value,
  };

  /* 发起 API 请求 */
  const response = await getUserList(params);
  // 处理响应数据...
};
</script>
```

### 3. 带排序功能的表格

```vue
<template>
  <el-table
    :data="tableData"
    @sort-change="handleSortChange"
  >
    <el-table-column
      prop="username"
      label="用户名"
      sortable="custom"
    />
    <el-table-column
      prop="createTime"
      label="创建时间"
      sortable="custom"
    />
  </el-table>
</template>

<script setup lang="ts">
/* 处理排序变化 */
const handleSortChange = ({ prop, order }: any) => {
  sort.value = {
    field: prop,
    order: order === 'ascending' ? 'ascend' : order === 'descending' ? 'descend' : null,
  };
};
</script>
```

## 最佳实践

### 1. 与 TanStack Query 结合使用

```typescript
import { useQuery, keepPreviousData } from '@tanstack/vue-query';

const { filters, pageSize, currentPage } = useTable<SearchFilters>({
  searchType: 'advance',
});

/* 使用 TanStack Query 管理数据获取 */
const { data: tableData, isLoading } = useQuery({
  queryKey: ['users', filters, pageSize, currentPage],
  queryFn: () => getUserList({
    page: currentPage.value,
    size: pageSize.value,
    ...filters.value,
  }),
  placeholderData: keepPreviousData,
});
```

### 2. URL 同步

```typescript
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

/* 从 URL 初始化过滤器 */
const { filters, search } = useTable<SearchFilters>({
  defaultFilters: {
    username: route.query.username as string || '',
    status: route.query.status as string || '',
  },
});

/* 监听过滤器变化，同步到 URL */
watchEffect(() => {
  router.replace({
    query: {
      ...route.query,
      ...filters.value,
      page: currentPage.value,
      size: pageSize.value,
    },
  });
});
```

### 3. 表单验证

```vue
<template>
  <el-form
    ref="formRef"
    :model="search.formState"
    :rules="rules"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="search.formState.username" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
const formRef = ref();

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
};

const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    search.submit();
  } catch (error) {
    console.log('表单验证失败', error);
  }
};
</script>
```

## 注意事项

1. **类型安全**: 使用 TypeScript 时，确保为 `Filters` 泛型提供正确的类型定义
2. **防抖配置**: 简单搜索模式下，合理设置 `searchDebounce` 值以平衡用户体验和性能
3. **强制刷新**: `submit()` 方法会添加随机数强制刷新，确保 TanStack Query 等缓存工具能正确更新
4. **分页重置**: 当过滤条件改变时，页码会自动重置为第一页

## 依赖项

- `vue` (^3.0.0)
- `@vueuse/core`
- `@utopia-utils/core`
