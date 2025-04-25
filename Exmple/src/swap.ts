import {PublicKey} from '@solana/web3.js';

// ==========================================================================================================
// 首先让我们先来聊聊，我们到底在做什么？，
// 我们希望和目标dex直接进行swap对吗？ 我们不希望通过官方SDK，有些官方甚至没有SDK
// 我们也不希望使用JUP，它返回的指令集实在是太大了，

// 既然我们不希望通过其他方式，但是在保险丝fuse.ts中 我们明明就知道
// "如果我想调用任意一个合约的指令，只需要提供三个东西对吗？"
// 1.程序ID
// 2.账户数组
// 3.指令参数

// 那么好，我们先来试着不通过RS，直接原生的接入Meteora Dlmm,   
// 1. 程序ID 
// Meteora Dlmm的合约地址非常好找，solscan上面随便都能看到，并且开发网和主网同一个ID，
// （本案例使用开发网，因为池子是我建的测试池子，请您使用模拟swap，真实swap会移动tick,这会影响后面的兄弟们）
const PROGRAM_ID = new PublicKey('LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo');

// 2. 账户数组
// 让我们打开solscan.io(dev), 
// 查看 https://solscan.io/tx/2YdkiVav5SAz1cL4yZLBmFfjwmV1CQP6MGLrB2ryFXszh9nDemRMCGfvfYz3wUvnAQbRvP6NoH6whFJQTewHxNa4?cluster=devnet
// 打开后往下拉，看到 #2 - Meteora DLMM Program: swap这一条指令了吗？（看不明白的话可以看看本文件夹附图swap配套阅读.png）

// 觉不觉得它和下方这里很像呢？好像存在某种关系？但是为什么第一个是LBU... 不是HTb呢？   
// 笨蛋，因为第一个的Meteora DLMM Program - LBU...，显示的是program阿(哈哈哈哈哈），
const KEYS = [
    { pubkey: new PublicKey('HTbQ21HraMDUa93hH5Mag7GhrogkEEqDXYy7gSkSa3Kf'), isSigner: false, isWritable: true}, 
    { pubkey: new PublicKey('LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo'), isSigner: false, isWritable: false },
    { pubkey: new PublicKey('8B8X3wHb3u2XGgtH27RJbHeWVf86ZGVFKs6QYPXkToeA'), isSigner: false, isWritable: true },
    { pubkey: new PublicKey('GLumD6LnSPvx5Vr9FE6LPJaDbAR1WqF4g218gAjkJP5o'), isSigner: false, isWritable: true }, 
    { pubkey: new PublicKey('5fGcb6fGttsKkgToqxmQjQCZPbhyUhAWescPdTs9Hh5W'), isSigner: false, isWritable: true },
    { pubkey: new PublicKey('DmRaAhvUqXVCri3xaP4TXMK6KtMTj59bz8GtLkPyRaJv'), isSigner: false, isWritable: true },
    { pubkey: new PublicKey('So11111111111111111111111111111111111111112'), isSigner: false, isWritable: false }, 
    { pubkey: new PublicKey('Hw4GeRXRY2yX1LyBQf2arKSfCH2kTRUvaaMbiQjwvXsQ'), isSigner: false, isWritable: false },
    { pubkey: new PublicKey('FafeDNEdSKZmR4J6NiiZy3thgxv2QERYnigZPSKtZ54E'), isSigner: false, isWritable: true },
    { pubkey: new PublicKey('LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo'), isSigner: false, isWritable: false },
     // @ts-ignore
    { pubkey: payer.publicKey, isSigner: true, isWritable: true }, 
    { pubkey: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'), isSigner: false, isWritable: false }, 
    { pubkey: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'), isSigner: false, isWritable: false },
    { pubkey: new PublicKey('D1ZN9Wj1fRSUQfCjhvnu1hqDMT7hzjzBBpi12nVniYD6'), isSigner: false, isWritable: false },
    { pubkey: new PublicKey('LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo'), isSigner: false, isWritable: false }, 
    { pubkey: new PublicKey('6xReLXkmXTKvBTvPzQXmL6uyUKyXmjVKps19RRBe1R7X'), isSigner: false, isWritable: true },
  ]

// 3.指令参数
// 如果您眼力够好，会看到 Instruction Data，这就是指令参数了（看不明白的话可以看看本文件夹附图swap配套阅读.png）
// 但是呢，scan上面看到的参数往往包含隐藏字段
// 这个隐藏字段实际上就是指令鉴别符，
// 有些DEX显示出来很恶心，甚至还带误导性的显示一个错误类型。

// “那我咋知道隐藏的是多少阿？？？”（别怕，有我呢）
// 如果您点击这个指令框的右上角的"Raw"(不是github上的Raw啊喂，solscan上的。),您会看到长的像这样的一串东西👇   我们后文简称ixD
//                                                        f8c69e91e17587c810270000000000000000000000000000

// “ixD长这样，我搞不懂阿，啥意思阿这是？？？”
// 那么您再点一下Raw 您会发现明文内容就是描述struct
// 它的结构大概是这样
const f_ixD = {
                amountIn:10000, 
                minAmountOut:0,  
            }
// 但如果您尝试按这样的方式进行序列话，那么会碰一鼻子灰("不行哇，序列化反序列话失败阿喂 喵喵瞄？？？")
// 因为有隐藏字段，该例为[u8;8]  有些交易所是u8 这些不重要，我会附件提供材料的，
// 它真正的结构是这样👇
const ixD = {
                bytes: [248, 198, 158, 145, 225, 117, 135, 200],
                amountIn: 10000,
                minAmountOut: 0,
            }
// 更清晰的定义是这样 👇 （其实用啥语言无所谓对吗？笔者会多种语言,语言只是媒介 原理都是一样的不要畏惧。您需要掌握的是思路及原理 并非哪一门语言）
// pub struct MeteoraDlmmIxD {
//     pub discriminator: [u8; 8],
//     pub amount_in: u64,
//     pub minAmount_out: u64,
// }


// ============================================================================================================



// 您发现了吗？和dex之间的原生直接交互
// 所必须的3个材料，我们都已经集齐了，
// 现在，它就像保险丝一样，简直是个hello world!
// 加上模板代码，直接发射我们就成功了！！奥利给！！！！

// 但是要注意的是
// 三要素之间，
// 1,程序ID 必然是常量
// 2.账户数组 大部分常量有几个变量
// 3.指令数据 完全是您操控的麻，指令鉴别符也是常量

// 那么难度就集中在 2.账户数组 中的几个变量account,
// 这就是复杂的点，为什么会有这种问题呢？
// 在solana中账户实际上只分两种
// 1,可执行   2.不可执行
// 这几个变量account实际上是为了记录数据，通过这些数据进行price,流动性等的定位，
// 这里涉及到几个算法，也就是您需要战斗的地方了。（最好是组团战斗,后续Lesson会进行算法讲解 这个比较花时间，我默认您能独立完成这一步.）
// 但是本例中的dev网，您是可以直接粘贴scan上面的数据，并把其中几个替换成自己的ata，就能实验成功的（注意先init您自己的ata）
// 因为它没有人去交互，price没有发生改变。

// 如果没问题,让咱们去💫 rs_swap.rs 💫

// 如果有问题,那真的有问题了0.0 只能慢慢磨。
// 搞几杯热茶，几包烟，一个算法看一天，哈哈。
// （笔者最初解算法时解完放在文件夹内吃灰,后来靠它吃了几顿小烧烤勒嘿嘿！）

// 并且这个东西一通百通,您只要能解一次。 
// 剩下的基本上就是重复性劳动 不同DEX有一点点细微差异而已
