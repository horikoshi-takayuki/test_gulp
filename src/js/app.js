// webpackエントリーポイント
// 基本的にはcommonのようにに記述する。
// npmプラグインは適宜インストールと読み込みをする。

// jQueryを使用する場合、webpack.config.jsのplugins部分のコメントアウトを外す

import Common from './modules/common';
Common();

import Top from './pages/top';
Top();
