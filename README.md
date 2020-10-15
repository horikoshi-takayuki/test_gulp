# Gulpテンプレート

ver.1.2.2
Author itahana  
20191031 追記

```
設定ファイルの場所、設定項目に変更があります。
/src/json は /config に移設してます。
CSS、JS、imgの出力ディレクトリも設定ファイルにて変更できるようにしています。
また、cssはpreloadの記述を足しました。
JSでも同じようにpreloadの記述を書けるのですが、生成するファイルの名称などが不特定になりやすいため記述はしていません。

```




## 概要
Gitと連携し、サーバへ直接デプロイしやすいようにそれぞれの特性に合わせたビルドができるようにしています。  
Nodeのバージョンなど、他テンプレートとの競合が予測されるので、anyenvに切り替えた場合には、  
古いプロジェクトで nodenv local でプロジェクトごとにNodeのバージョンを指定した方がいいです。

.gitignoreにてdevelopフォルダはコミットされません。
開発状態でのファイルのコンフリクトが多くなりがちなのでsrcとdistのpullによるマージのみ行い、  
各員のローカルにてdevelopフォルダに再生成されます。

developブランチへのマージの前に、後述するコマンド「gulp build」にてテスト（納品レベル）ファイルをビルドしてください。  
distフォルダが生成または更新されます。  
こちらは差分抽出的にも、リポジトリとして確認できるようにもコミットされます。


## 設定ファイル
gulpconfig.jsonにてGulpの設定値を記述しています。  
ディレクトリなどを変えたい、browser-syncの設定を変えたい、という場合はこのファイルを編集してください。
開発ファイルのルートにあります。

*※jsonにはコメントアウトできませんが、説明用と思ってください。*

```
gulpconfig.json

{
	"dir": {
		"jsonDir": "config/",			// 設定用json格納ディレクトリ
		"srcDir": "src/",				// ソースコードの存在するベースのティレクトリ
		"destDir": "dist/",				// ビルド後に出力するベースのディレクトリ
		"devDir": "develop/",			// 開発用ビルドを出力するベースのディレクトリ
		
		"jsDir": "src/js/",				// jsソースコードの存在するベースのティレクトリ
		"scssDir": "src/scss/",			// scssの存在するベースのティレクトリ
		"imgDir": "src/image/",			// imgの存在するベースのティレクトリ
		"tmplDir": "src/templates/"	// ejsテンプレート格納ディレクトリ
		
		"destCssDir": "assets/css",	// CSSを出力するティレクトリ
		"destImgDir": "assets/img",	// imgを出力するティレクトリ
		"destJsDir": "assets/js"		// jsを出力するティレクトリ
	},
	"serverSet": {
		"server": {
			"baseDir": "develop/"		// browser-syncで表示するドキュメントルート
		},
		"open": "external",				// IPで開く
		"startPath": "../"				// 開かれるPathの指定
	},
	"prefixer": {						// prefixerの対応バージョン指定
		"browsers": ["last 2 versions", "ie > 8", "Android > 4"],
		"cascade": false
	}
}

```


サイト設定用のjsonです。  
あまり記述内容はないですが、サイト全体に関わる物を記載しています。  
GAのIDなどもここで設定値を変更することでassets.ejsの編集は一切いらなくなります。
また、CSSは開発時はminifyされていない物を読み込むようにしています。

```
/src/json/site.json

{
  "url": "https://www.example.jp/",
	"faviconPath": "/favicon.ico",
	"commomCssPath": "/assets/css/common.min.css",
	"commomCssDevPath":  "/assets/css/common.css",
	"gaId": "UA-XXXXXXXX"
}

```


各ページ設定用のjsonです。  
ページによってSNS用のogimageやURLが変わる場合はここに設定値を入力するだけになります。
共通でいい場合は、コピペでそのままにしてください。

```
/src/json/pages.json

{
	"pages": [
		{
			"id": "top",								// 一意のID
			"ejs_layout": "layouts/top/index.ejs",		// レイアウトファイルのパス
			"ejs_dir": "top/",							// コンテンツファイルのディレクトリパス
			"ejs_file": "index",						// コンテンツファイルのファイル名
			"dist_dir": "",								// 出力されるディレクトリ
			"dist_file": "index",						// 出力されるファイル名
			"title": "テンプレート",
			"description": "TOPの説明",
			"keyword": "キーワード,キーワード",
			"ogimage": "assets/img/ogimage.jpg",
			"url": ""
		},
		{
			"id": "about",
			"ejs_layout": "layouts/under/layout.ejs",
			"ejs_dir": "about/",
			"ejs_file": "index",
			"dist_dir": "/about",
			"dist_file": "index",
			"title": "テンプレート｜about",
			"description": "aboutの説明",
			"keyword": "キーワード,キーワード",
			"ogimage": "assets/img/ogimage.jpg",
			"url": "about/"
		}
	]
}
```




## Gulpコマンド

**$ gulp**
> 開発用  
> developフォルダにdistされ、ローカルのwebサーバが立ち上がります。

**$ gulp dev**
> 開発用  
> developフォルダにdistされますが、サーバは立ち上がりません。

**$ gulp build**
> テスト用  
> distフォルダにdistされ、それぞれ納品用のファイルになります。



## 作業フロー

通常の開発状態では、「$ gulp」コマンドでローカルサーバを立ち上げて作業を行います。  
テストサーバにてテストを行う際には、「$ gulp build」コマンドにて、distフォルダを生成または更新し、  
コミットとテストサーバでの確認をします。
Gitにてステージングへデプロイできる環境であれば、コミット後developブランチへmarge、pushすることで反映されます。



## 差分ファイル

※現在準備中です。  
developブランチへpushされたタイミングでdistフォルダ内の差分が抽出されます。  
システムが準備されるまでは手動でdistフォルダの差分抽出を行ってください。  

SourceTree　コミット間の差分ファイルの抽出　参考  
https://ics.media/entry/4475/



## 仕様

Node v10.13.0 以上  
npm 6.4.1 以上  
（表記よりも上のバージョンの場合、ライブラリのupdateが必要かもしれません。）

Gulpで各タスクが走ります。

- sass to css
- css minify
- ejs to html
- image minify
- webpack(babel) to js minify
- browser-sync(ローカルサーバ)

cssはstylelint、jsはeslint、ルールはprettier含む。
