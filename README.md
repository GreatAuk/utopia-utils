# Utopia-Utils

<p align="center">
    <a href="https://codecov.io/gh/GreatAuk/utopia-utils" >
    <img src="https://codecov.io/gh/GreatAuk/utopia-utils/branch/main/graph/badge.svg?token=KU3KJCHA4V"/>
    </a>
    <a href="https://www.npmjs.com/package/@utopia-utils/core" target="__blank">
      <img src="https://img.shields.io/npm/v/@utopia-utils/core.svg?style=flat-square&colorB=51C838" alt="NPM Version" />
    </a>
    <!-- <a href="https://www.npmjs.com/package/@plugin-web-update-notification/core" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@plugin-web-update-notification/core?color=50a36f&label="></a> -->
    <a href="https://github.com/GreatAuk/utopia-utils/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="License" />
    </a>
    <!-- <a href="https://github.com/GreatAuk/plugin-web-update-notification/discussions" target="__blank">
      <img src="https://img.shields.io/badge/discussions-on%20github-blue?style=flat-square&colorB=51C838" alt="discussions-image" />
    </a> -->
    <br>
</p>

**目录**

* [安装](#安装)
* [API 参考](#api-参考)
  * [数组](#数组)
  * [对象](#对象)
  * [函数](#函数)
  * [Promise](#promise)
  * [字符串](#字符串)
  * [数值](#数值)
  * [URL](#url)
  * [编解码](#编解码)
  * [树结构](#树结构)
  * [Vue Composables](#vue-composables)
  * [DOM](#dom)
  * [浏览器环境](#浏览器环境)
  * [类型判断](#类型判断)
  * [CLI 工具](#cli-工具)
  * [杂项](#杂项)
* [废弃的 API](#废弃的-api)
* [第三方库](#第三方库)
* [推荐的工具库](#推荐的工具库)

### 安装

```bash
# 核心包，包含绝大部分 utils
pnpm add @utopia-utils/core

# 仅安装 Vue Composables (Vue 3)
pnpm add @utopia-utils/vueuse

# 仅安装 DOM 相关 utils
pnpm add @utopia-utils/dom

# 仅安装树结构相关 utils
pnpm add @utopia-utils/tree

# 仅安装类型判断相关 utils
pnpm add @utopia-utils/share

# 仅安装 CLI 工具
pnpm add @utopia-utils/cli
```

### API 参考

#### 数组

* [average](#average): 计算数组的平均值，支持 `object` 数组。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/math.ts)
* [sum](#sum): 计算数组的和，支持 `object` 数组。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/math.ts)
* [sort](#sort): 数组排序，支持 `object` 数组。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/sort.ts)
* [alphabetical](#alphabetical): 数组按字母顺序排序，支持 `object` 数组。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/sort.ts)
* [unique](#unique): 数组去重。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/unique.ts)
* [union](#union): 数组并集。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/union.ts)
* [uniqueWith](#uniquewith): 数组去重，使用自定义的比较函数。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/uniqueWith.ts)
* [intersection](#intersection): 两个数组交集。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/intersection.ts)
* [groupBy](#groupby): 数组根据指定的 key 分组。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/groupBy.ts)
* [arrLast](#arrlast): 获取数组最后一个元素。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/arrLast.ts)
* [arrayToCSV](#arraytocsv): 数组转换为 CSV 字符串。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/csv.ts)

#### 对象

* [defineDictionary](#defineDictionary): 定义业务字典，类型安全。 [source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/defineDictionary.ts)
* [objectKeys](#objectkeys): 带类型的 `Object.keys()`。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/objectKeys.ts)
* [omit](#omit): 删除 `object` 对象的指定属性。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/omit.ts)
* [pick](#pick): 从 `object` 对象中获取指定属性。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/pick.ts)
* [getByPath](#getbypath): 通过路径获取对象的值，类型安全。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/doPathValue.ts)
* [setByPath](#setbypath): 通过路径设置对象的值，类型安全。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/doPathValue.ts)
* [deepClone](#deepclone): 深拷贝。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/deepClone.ts)
* [deepEqual](#deepequal): 深比较。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/deepEqual.ts)
* [merge](#merge): 深合并两个对象，返回一个新对象。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/vendor.ts)
* [merge.all](#merge.all): 深合并多个对象到一个新对象。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/vendor.ts)

#### 函数

* [compose](#compose): 函数组合, 从右到左执行。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/compose.ts)
* [pipe](#pipe): 函数组合, 从左到右执行。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/pipe.ts)
* [memoize](#memoize): 创建一个会缓存返回结果的函数。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/memoize.ts)
* [callLimit](#calllimit): 限制函数调用次数。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/callLimit.ts)
* [once](#once): 限制函数只能调用一次。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/once.ts)
* [debounce](#debounce): 防抖。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/vendor.ts)
* [throttle](#throttle): 节流。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/vendor.ts)
* [measurePerformance](#measureperformance): 测量函数执行性能，返回执行耗时。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/share/src/measurePerformance.ts)

#### Promise

* [sleep](#sleep): 等待指定的时间。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/sleep.ts)
* [retry](#retry): 重试函数（如果函数抛出错误）直到成功或者达到最大重试次数。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/retry.ts)
* [to](#to): 一个让你在 async/await 中轻松处理错误的装饰器，免于使用 try-catch。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/awaitTo.ts)
* [onlyResolvesLast](#onlyresolveslast): 解决竞态问题，只保留最后一次调用的结果。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/onlyResolvesLast.ts)
* [onTimeout](#ontimeout): `setTimeout` 的封装, 返回一个清除定时器的函数。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/onTimeout.ts)
* [createPoll](#createpoll): 创建一个轮询器。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/createPoll.ts)
* [createControlledPromise](#createcontrolledpromise): 创建一个可控的 Promise。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/createControlledPromise.ts)

#### 字符串

* [randomString](#randomstring): 随机生成指定长度、指定字符集的字符串。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/randomString.ts)
* [capitalize](#capitalize): 首字母大写。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/capitalize.ts)
* [escapeStringRegexp](#escapestringregexp): 把字符串中的特殊字符转义为它可以在正则表达式中使用的形式。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/escapeStringRegexp.ts)
* [encryptPhone](#encryptphone): 加密手机号, 中间 4 位显示成 `*`。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/encryptPhone.ts)
* [formatterBankCard](#formatterbankcard): 银行卡号格式化。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/stringFormatter.ts)
* [formatterPhoneNumber](#formatterphonenumber): 手机号格式化。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/stringFormatter.ts)
* [formatterIdCard](#formatteridcard): 身份证呈格式化。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/stringFormatter.ts)
* [desensitizeName](#desensitizename): 姓名脱敏。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/stringDesensitize.ts)
* [desensitizePhone](#desensitizephone): 手机号脱敏。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/stringDesensitize.ts)
* [desensitizeIDCard](#desensitizeidcard): 身份证脱敏。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/stringDesensitize.ts)
* [desensitizeEmail](#desensitizeemail): 邮箱脱敏。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/stringDesensitize.ts)

#### 数值

* [randomInt](#randomint): 生成指定范围内`[min, max]`的整数。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/randomInt.ts)
* [toFixedWithoutZeros](#tofixedwithoutzeros): `Number.toFixed` 并移除末尾的零。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/math.ts)
* [formatNumberThousand](#formatnumberthousand): 数字千分位格式化。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/formatNumberThousand.ts)
* [yuanToFen](#yuantofen): 人民币：元转分。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/yuanToFen.ts)
* [fenToYuan](#fentoyuan): 人民币：分转元。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/fenToYuan.ts)
* [yuanFormat](#yuanformat): 人民币格式化（单位默认是分，会进行分转元再格式化）。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/yuanFormat.ts)
* [NP](#np): 解决浮点数计算精度问题。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/vendor.ts)

#### URL

* [getQueryParams](#getqueryparams): 从 URL 中解析查询参数。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/getQueryParams.ts)
* [parseQuery](#parsequery): 解析 url query。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/parseQuery.ts)

#### 编解码

* [base64ToFile](#base64tofile): base64 转 File, 如图片裁剪时，我们获取到的是 base64，但上传接口一般需要 formData 上传。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/base64ToFile.ts)
* [toBase64](#tobase64): 将 `File` | `Blob` | `imgUrl` 转 base64。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/toBase64.ts)

#### 树结构

* [breadthFirstTraverse](#breadthFirstTraverse): 广度优先遍历。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/breadthFirstTraverse.ts)
* [deepFirstTraverse](#deepfirsttraverse): 深度优先遍历。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/deepFirstTraverse.ts)
* [treeFindNode](#treeFindNode): 查找符合条件的单个节点或多个节点，通过广度优先遍历查找。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/treeFindNode.ts)
* [buildTreeFromList](#buildTreeFromList): 列表结构转树结构。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/buildTreeFromList.ts)
* [flattenTree](#flattenTree): 树结构转列表结构（打平）。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/flattenTree.ts)
* [treeFindPath](#treeFindPath): 查打符合条件节点的路径。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/treeFindPath.ts)
* [treeFilterNode](#treeFilterNode): 过滤不符合条件的树节点。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/treeFilterNode.ts)

#### Vue Composables

* [useSmsCountdown](#usesmscountdown): 短信验证码倒计时的 Vue composable 函数，提供完整的验证码发送倒计时功能。支持自定义倒计时时长、控制发送状态、自定义显示文本等。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/vueuse/src/useSmsCountdown)
* [useTable](#usetable): 表格状态管理 Hook 的简单封装，减少模板代码。提供分页、排序、过滤和搜索功能的完整解决方案。支持简单搜索模式（实时搜索）和高级搜索模式（手动搜索）。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/vueuse/src/useTable)
* [useFakeProgress](#usefakeprogress): 可控的假进度条 Hook，支持自动递增、手动控制、自定义递增算法，提供进度变化/完成回调，适用于上传、异步加载等场景。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/vueuse/src/useFakeProgress)
* [useDelayedLoading](#usedelayedloading): 延迟显示与最小显示时间控制的 loading 状态管理 Hook，可有效避免短请求导致的 loading 闪烁问题。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/vueuse/src/useDelayedLoading)

#### DOM

* [waitForSelector](#waitforselector): 等待指定的选择器匹配的元素出现在页面中，如果调用此方法时已经有匹配的元素，那么此方法立即返回。 如果指定的选择器在超时时间后扔不出现，返回 `null`。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/waitForSelector.ts)
* [panzoom](#panzoom): 为指定的元素添加拖拽缩放功能。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/panzoom/core.ts)
* [domContains](#domcontains): 原生 `Node.contains()` 的兼容写法 。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/domContains.ts)
* [dynamicCSS](#dynamiccss): 注入 css 样式（通过动态插入 style 标签）。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/dynamicCSS.ts)
* [loadCSS](#loadcss): 动态加载 CSS。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/loadCSS.ts)
* [loadScript](#loadscript): 动态加载脚本。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/loadScript.ts)
* [setCssVar](#setcssvar): 设置 `css` 变量。 [source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/setCssVar.ts)

#### 浏览器环境

* [canUseDom](#canusedom): 判断是否可以使用 `document` 和 `window` 对象，判断是否是 ssr 场景。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/canUseDom.ts)
* [isAlipay](#isalipay): 判断是否是支付宝浏览器。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/isAlipay.ts)
* [isAndroid](#isandroid): 判断是否是 Android 系统。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/isAndroid.ts)
* [isIOS](#isios): 判断是否是 IOS 系统。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/isIOS.ts)
* [isWeixin](#isweixin): 判断是否是微信浏览器。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/isWeixin.ts)
* [isMobile](#ismobile): 判断是否是移动端浏览器。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/isMobile.ts)
* [checkWebpFeature](#checkwebpfeature): 检测浏览器是否支持 webp 的一些特性（'lossy' | 'lossless' | 'alpha' | 'animation'）。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/webp.ts)
* [checkWebpSupport](#checkwebpsupport): 检测浏览器是否支持 webp。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/webp.ts)
* [onWindowFocus](#onwindowfocus): 监听 `window focus` 和 `visibilitychange` 事件，当窗口可见时，触发回调。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/onWindowFocus.ts)
* [Cookies](#cookies): 操作 Cookie 的工具函数。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/vendor.ts)

#### 类型判断

* `isBoolean`
* `isString`
* `isNumber`
* `isFunction`
* `isSymbol`
* `isArray`
* `isRegExp`
* `isMap`
* `isPromise`
* `isSet`
* `isDate`
* `isPlainObject`
* `isObject`
* `isIntegerKey`
* `isUndef`
* `isDef`
* [isEmpty](#isempty): 检查值是否为空（例如 `''`, `[]`, `{}`）。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/share/src/isEmpty.ts)
* [isNumberLike](#isnumberlike): 检查值是否像一个数字（例如 `'123'`）。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/share/src/isNumberLike.ts)
* [isValidUrl](#isvalidurl): 检查字符串是否为有效的 URL。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/share/src/isValidUrl.ts)
* [isPositiveNumber](#ispositivenumber): 检查值是否为正数。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/share/src/isPositiveNumber.ts)
* [isNegativeNumber](#isnegativenumber): 检查值是否为负数。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/share/src/isNegativeNumber.ts)
* [isKeyOf](#iskeyof): 检查一个 key 是否为对象的属性，类型安全。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/share/src/isKeyOf.ts)
* [toTypeString](#totypestring): 获取值的具体类型字符串，比 `typeof` 更精确。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/share/src/utils.ts)

#### CLI 工具

* [getGitCommitHash](#getgitcommithash): 获取当前 Git 提交的哈希值。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/cli/src/getGitCommitHash.ts)
* [isDirector](#isdirector): 判断指定路径是否为目录。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/cli/src/isDirector.ts)
* [isFile](#isfile): 判断指定路径是否为文件。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/cli/src/isFile.ts)
* [pathExists](#pathexists): 判断指定路径是否存在。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/cli/src/pathExists.ts)

#### 杂项

* [getFileName](#getfilename): 获取文件名。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/getFileName.ts)
* [mitt](#mitt): 轻量级的事件发布/订阅库。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/vendor.ts)

---

### 废弃的 API

* ~~[createEnumFromOptions](#createEnumFromOptions): 通过 `options` 自动生成对应的 `enum`， 后期只需要维护 `options`。**typesafe**。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/createEnumFromOptions.ts)~~
  > **已废弃**, 请使用 [defineDictionary](#defineDictionary) 代替。

---

### 第三方库

> `@utopia-utils/core` 重新导出了下面这些优秀的第三方库，方便直接使用。

* [debounce](https://github.com/niksy/throttle-debounce#debounce): 函数防抖。
* [throttle](https://github.com/niksy/throttle-debounce#throttle): 函数节流。
* [js-cookie](https://github.com/js-cookie/js-cookie): 轻量级的浏览器 cookie 操作库。
* [mitt](https://github.com/developit/mitt): 仅 200 字节的函数式事件发布/订阅库，类型安全。
* [deepmerge](https://github.com/TehShrike/deepmerge): 深度合并对象的库。
* [number-precision](https://github.com/nefe/number-precision): 解决浮点数计算精度问题的库。

### 推荐的工具库

* [`file-saver`](https://github.com/eligrey/FileSaver.js): An HTML5 saveAs() FileSaver implementation.
* [`zod`](https://github.com/colinhacks/zod): TypeScript-first schema validation with static type inference.
* [`dayjs`](https://github.com/iamkun/dayjs): ⏰ Day.js 2kB immutable date-time library alternative to Moment.js with the same modern API.
* [`any-rule`](https://any-rule.vercel.app/): 常用正则大全。
* [`fast-deep-equal`](https://github.com/epoberezkin/fast-deep-equal): The fastest deep equality check with Date, RegExp and ES6 Map, Set and typed arrays support.
* [`big.js`](https://github.com/MikeMcl/big.js): 一个小型，快速的 JavaScript 库，用于任意精度的十进制算术运算。
* [`browser-image-compression`](https://github.com/Donaldcwl/browser-image-compression): Javascript module to be run in the web browser for image compression.
* [`hashids`](https://github.com/niieani/hashids.js): generate YouTube-like ids from numbers.

---

##### defineDictionary

定义业务字典, **类型安全**

```ts
// at src/constant.ts
const { get_MUSIC_TYPE_KEYS, get_MUSIC_TYPE_KV, get_MUSIC_TYPE_MAP, get_MUSIC_TYPE_MAP_BY_KEY, get_MUSIC_TYPE_MAP_BY_VALUE, get_MUSIC_TYPE_OPTIONS, get_MUSIC_TYPE_VALUES, get_MUSIC_TYPE_VK } = defineDictionary([
  {
    key: 'POP',
    value: 1,
    label: '流行音乐',
    color: 'red',
  },
  {
    key: 'ROCK',
    value: 2,
    label: '摇滚音乐',
    color: 'blue',
  },
] as const, 'MUSIC_TYPE') // !!! 必须使用 as const 来保证类型安全

export const MUSIC_TYPE_KEYS = get_MUSIC_TYPE_KEYS()
// ['POP', 'ROCK']
export const MUSIC_TYPE_VALUES = get_MUSIC_TYPE_VALUES()
// [1, 2]
export const MUSIC_TYPE_KV = get_MUSIC_TYPE_KV()
// { POP: 1, ROCK: 2 }
export const MUSIC_TYPE_VK = get_MUSIC_TYPE_VK()
// { 1: 'POP', 2: 'ROCK' }
export const MUSIC_TYPE_MAP_BY_KEY = get_MUSIC_TYPE_MAP_BY_KEY()
// {
//   POP: { key: 'POP', value: 1, label: '流行音乐', color: 'red' },
//   ROCK: { key: 'ROCK', value: 2, label: '摇滚音乐', color: 'blue' }
// }
export const MUSIC_TYPE_MAP_BY_VALUE = get_MUSIC_TYPE_MAP_BY_VALUE()
// {
//   1: { key: 'POP', value: 1, label: '流行音乐', color: 'red' },
//   2: { key: 'ROCK', value: 2, label: '摇滚音乐', color: 'blue' }
// }
export const MUSIC_TYPE_MAP = get_MUSIC_TYPE_MAP()
// { POP: 1, ROCK: 2 }
export const MUSIC_TYPE_OPTIONS = get_MUSIC_TYPE_OPTIONS()
// [
//   { key: 'POP', value: 1, label: '流行音乐', color: 'red' },
//   { key: 'ROCK', value: 2, label: '摇滚音乐', color: 'blue' }
// ]
```

##### createEnumFromOptions

> **已废弃**, 请使用 [defineDictionary](#defineDictionary) 代替。

通过 `options` 自动生成对应的 `enum`， 后期只需要维护 `options`。**类型安全**

```ts
// example
const optionsLevel = [
  {
    value: 0,
    label: 'level1',
  },
  {
    value: 1,
    label: 'level2',
  },
] as const // 必须使用 as const 来保证类型安全

const enumLevel = createEnumFromOptions(optionsLevel)
console.log(enumLevel.level1) // 0
console.log(enumLevel['0']) // 'level1'
console.log(enumLevel)
// {
//   "0": "level1",
//   "1": "level2",
//   "level1": 0,
//   "level2": 1
// }
```

##### retry
重试函数（如果函数抛出错误）直到成功或者达到最大重试次数。

```ts
let callNum = 0
function fn() {
  callNum++
  return Promise.reject(new Error('foo'))
}
const [err, res] = await retry(fn, 2, (attemptTime) => {
  return attemptTime * 5
})
// err 是 Error, res 是 null, callNum 是 3
// 总执行时间 >= 15ms (5ms + 10ms)
```

### Tree Utils

> 所有的 Tree utils 支持自定义 fieldNames
>
> ```ts
> export interface FieldNames {
>   id?: string
>   children?: string
>   parentId?: string
> }
> ```

##### breadthFirstTraverse

广度优先遍历。

![img](https://miro.medium.com/max/1400/1*ePzEF2S4pcLqoRzPSW_gKA.png)

```ts
// example
const tree = [
  {
    name: 'a',
    Children_: [
      { name: 'b' },
    ],
  },
  {
    name: 'c',
  },
]

breadthFirstTraverse(tree, node => console.log(node.name), {
  fieldNames: {
    children: 'Children_', // 默认为 'children'
  },
})
// output 'a', 'c', 'b'
```

##### treeFindNode

查找符合条件的单个节点或多个节点，通过广度优先遍历查找。

```ts
// example
const tree = [
  {
    name: 'a',
    children: [
      { name: 'b' },
    ],
  }
]

const res = treeFindNode(tree, node => node.name === 'b') // res is [{ name: 'b' }]
```

##### buildTreeFromList

列表结构转树结构。

```ts
// example
const list = [
  { uid: '1', title: 'node 1', pid: '' },
  { uid: '1-1', title: 'node 1-1', pid: '1' },
  { uid: '1-2', title: 'node 1-2', pid: '1' },
  { uid: '1-1-1', title: 'node 1-1-1', pid: '1-1' },
]

interface TreeNode {
  key: string
  title: string
  children: TreeNode[]
  pid: string
}

const tree = buildTreeFromList<TreeNode>(list, {
  listFieldNames: { id: 'uid', parentId: 'pid' },
  treeFieldNames: { id: 'key', parentId: 'pid', children: 'children' },
})
```

##### flattenTree

打平，树结构转列表结构。

```ts
// example
const tree = {
  id: 1,
  children: [
    {
      id: 2,
    },
  ],
}
const list = flattenTree(tree)
console.log(list)
// output
// [
//   {
//     "id": 1,
//     "children": [
//       {
//         "id": 2,
//       },
//     ],
//   },
//   {
//     "id": 2,
//   },
// ]
```

##### treeFindPath

查打符合条件节点的路径。

```ts
// example
const tree = [
  {
    name: 'a',
    children: [
      { name: 'b' },
    ],
  },
  {
    name: 'c',
  },
]

const path = treeFindPath(tree, node => node.name === 'b')
console.log(path?.map(v => v.name)) // ['a', 'b']
```

##### treeFilterNode

过滤不符合条件的树节点。

```ts
const tree = [
  {
    id: 'root',
    children: [
      {
        id: 'child1',
      },
      {
        id: 'child2',
      },
    ],
  },
]
treeFilterNode(tree, node => node.id.includes('1'))
// output
// [
//   {
//     children: [
//       {
//         id: 'child1',
//       },
//     ],
//     id: 'root',
//   },
// ]
```

## License

[MIT](./LICENSE)
