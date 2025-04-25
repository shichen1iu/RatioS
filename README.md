# 概览

    RatioS 是一款solana 链上的 program 

    “Ratio”强调比例,“S”代表交换Swap(下文简称RS)

    RS不是一款部署完就可以马上跑的bot或其他类型的链下脚本

    RS更像是当您想搭建一座城堡时必不可少的模块化接口,一种综合代理SWAP接口,
    
    RS使用原生RUST语言开发且经unsafe等底层优化,支持按%比例下单,几乎不占用CU资源

    通过 "有点类似于ALT的索引方式(非ALT)将指令传递并转发给链上DEX",

    使用RS,您在开发套利程序时,可以完全不关心链上程序的这一部分设施,专注于链下开发
    
    并且它天然自带一项能力,使您可以 "在黑暗森林中寻找队友",
    
    如果您在搭建城堡时常常觉得非常的疲倦,那么最理智的方式则是寻找同路人,携伴同行.

    每个人负责完成城堡中算法的一部分,将各自的那一部分代码编译为动态链接库,
    
    库内定义过期时间等方式保护各自的权益,钱包使用多签钱包,
    ( 例如 👉 -> 📦 gas fee wallet send tx  -> 🏛 flash loan  -> 🎰 DEX RS_SWAP -> 💰 multisig wallet)

    ✅✅ SOLANA_RS_PROGRAM_ID : RSoojvmJQP1NRci479HQHKa4wF6TJKZsb2SZC6tKXFn (dev和main同一个)✅✅
    目前支持17个DEX的代理SWAP,名单如下

    "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"	"Meteora DLMM"  💫
    "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"   "Pump.fun"  💫
    "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"	"Pump.fun Amm"  💫
    "cpamdpZCGKUy5JxQXB4dcpGPiikHawvSWAd6mEn1sGG"	"Meteora DAMM v2" 💫
    "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK" 	"Raydium CLMM" 💫
    "CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C" 	"Raydium CP" 💫
    "2wT8Yq49kHgDzXuPxZSaeLaH1qbmGXtEyPy64bL7aD3c" 	"Lifinity V2"   💫
    "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"  "Raydium"  💫
    "Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB"  "Meteora"      💫
    "swapNyd8XiQwJ6ianp9snpu4brUqFxadzvHebnAXjJZ"	"Stabble Stable Swap" 💫
    "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"	"Whirlpool" 💫
    "swapFpHZwjELNnjvThjajtiVmkz3yPQEHjLtka2fwHW"	"Stabble Weighted Swap" 💫
    "ZERor4xhbUycZ6gb9ntrhqscUcZmAbQDjEAtCf4hbZY"	"ZeroFi"  💫 
    "9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP"  "Orca V2" 💫
    "SoLFiHG9TfgtdUXUjWAxi3LtvYuFyDLVhBWxdMZxyCe"	"SolFi"     💫   
    "DEXYosS6oEGvk8uCDayvwEZz4qEyDJRf9nFgYCaqPMTm" 	"1DEX"  💫
    "CURVGoZn8zycx6FXwwevgBTB2gVvdbGTEpvMJDbgs2t4" 	"Aldrin V2"  💫

    请让我当着向导带着您走,这样就不会迷路.这不是传统的Git项目，更像是一份教程
        
    有经验的开发者请转至Exmple文件夹(请先阅读Exmple夹内README.md)

    新手请转至Lesson文件夹(我将带您从0开始实践开发,请先阅读Lesson夹内README.md)

    Dear friends, Have fun!

## 🙌 致谢
    感谢@Michael哥及BuffChain社区

## 📞 联系
    邮箱: null999999999@proton.me 
    或者来BuffCahin(😈)

## 🎂 赞助
    SOLANA 👉 4vmGVyTVgHuZV4FK9GxRTRXMF27d22bASznSuaGeVg2M  
