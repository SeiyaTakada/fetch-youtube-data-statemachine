# Step Functions + Lambda実行環境サンプル

## テンプレートファイルの出力

```bash
yarn create-template
```

## 各実行環境の起動

```bash
docker-compose build
docker-compose up -d
```

## ステートマシンの作成

```bash
bash ./statemachine/create-sfn.sh
```

## ステートマシンの実行

```bash
bash ./statemachine/execute-sfn.sh
```

## ステートマシンの実行結果取得

```bash
bash ./statemachine/describe-sfn.sh
```
