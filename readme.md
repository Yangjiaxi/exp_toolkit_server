# Experiment Toolkit, Server side

## APIs

### response

成功

```js
{
    type: "success",
    data: Object || null,
}
```

失败

```js
{
    type: "error" || "warning",
    message: String,
    data: Object || null
}
```

