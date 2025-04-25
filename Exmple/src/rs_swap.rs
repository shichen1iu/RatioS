// ==========================================================================================================
// 首先让我们来聊聊，RS是怎么工作的
// RS只是忠实的将您的tx包进行转发
// 除了修改input amount这个部分 其他的完全不做任何处理.
// 让我们从3要素开始出发吧.(请您用熟悉的编程语言进行实验)

// 1,程序ID
let PROGRAM_ID = Pubkey::from_str("RSoojvmJQP1NRci479HQHKa4wF6TJKZsb2SZC6tKXFn").unwrap();
// 当我们和目标dex直接原生交互时,程序ID当然是目标DEX
// 但是我们现在是通过代理,那必须使用RS的ID了呀.这个很好理解,不赘述

// 2.账户数组
// 如果您一步步的按步骤和我一起走过来会发现
// 除了开头我框起来的部分  "RS 所需要的"
// 剩下的Keys完全就和原生的一模一样麻!(那账户数组位置不就变了吗?转发完指令不就错了吗?,别着急,让我们折叠起来去看指令数据部分)
accounts: vec![
          // =================================== RS 所需要的 ===================================
            // 1.您想真实swap的目标dex ID,变量
            AccountMeta::new_readonly(
                Pubkey::from_str("LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo").unwrap(),
                false 
            ),
            // 2.不用管,常量
            AccountMeta::new_readonly(
                Pubkey::from_str("11111111111111111111111111111111").unwrap(),
                false 
            ),
            // 3.不用管,常量
            AccountMeta::new(
                Pubkey::from_str("4vmGVyTVgHuZV4FK9GxRTRXMF27d22bASznSuaGeVg2M").unwrap(),
                false 
            ),
          // =================================================================================

            // "name": "lbPair",
            // "isMut": true,
            // "isSigner": false
            AccountMeta::new(
                Pubkey::from_str("HTbQ21HraMDUa93hH5Mag7GhrogkEEqDXYy7gSkSa3Kf").unwrap(),
                false 
            ),
            // "name": "binArrayBitmapExtension",
            // "isMut": false,
            // "isSigner": false,
            // "isOptional": true
            AccountMeta::new_readonly(
                Pubkey::from_str("LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo").unwrap(),
                false 
            ),
            // "name": "reserveX",
            // "isMut": true,
            // "isSigner": false
            AccountMeta::new(
                Pubkey::from_str("8B8X3wHb3u2XGgtH27RJbHeWVf86ZGVFKs6QYPXkToeA").unwrap(),
                false 
            ),
            // "name": "reserveY",
            // "isMut": true,
            // "isSigner": false
            AccountMeta::new(
                Pubkey::from_str("GLumD6LnSPvx5Vr9FE6LPJaDbAR1WqF4g218gAjkJP5o").unwrap(),
                false 
            ),
            // "name": "userTokenIn",
            // "isMut": true,
            // "isSigner": false
            AccountMeta::new(
                Pubkey::from_str("5fGcb6fGttsKkgToqxmQjQCZPbhyUhAWescPdTs9Hh5W").unwrap(),
                false 
            ),
            // "name": "userTokenOut",
            // "isMut": true,
            // "isSigner": false
            AccountMeta::new(
                Pubkey::from_str("DmRaAhvUqXVCri3xaP4TXMK6KtMTj59bz8GtLkPyRaJv").unwrap(),
                false 
            ),
            // "name": "tokenXMint",
            // "isMut": false,
            // "isSigner": false
            AccountMeta::new_readonly(
                Pubkey::from_str("So11111111111111111111111111111111111111112").unwrap(),
                false 
            ),
            // "name": "tokenYMint",
            // "isMut": false,
            // "isSigner": false
            AccountMeta::new_readonly(
                Pubkey::from_str("Hw4GeRXRY2yX1LyBQf2arKSfCH2kTRUvaaMbiQjwvXsQ").unwrap(),
                false 
            ),
            // "name": "oracle",
            // "isMut": true,
            // "isSigner": false
            AccountMeta::new(
                Pubkey::from_str("FafeDNEdSKZmR4J6NiiZy3thgxv2QERYnigZPSKtZ54E").unwrap(),
                false 
            ),
            // "name": "hostFeeIn",
            // "isMut": true,
            // "isSigner": false,
            // "isOptional": true
            AccountMeta::new_readonly(
                Pubkey::from_str("LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo").unwrap(),
                false 
            ),
            // "name": "user",
            // "isMut": false,
            // "isSigner": true
            AccountMeta::new(
                payer.pubkey(),
                true 
            ),
            // "name": "tokenXProgram",
            // "isMut": false,
            // "isSigner": false
            AccountMeta::new_readonly(
                Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap(),
                false 
            ),
            // "name": "tokenYProgram",
            // "isMut": false,
            // "isSigner": false
            AccountMeta::new_readonly(
                Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap(),
                false 
            ),
            // "name": "eventAuthority",
            // "isMut": false,
            // "isSigner": false
            AccountMeta::new_readonly(
                Pubkey::from_str("D1ZN9Wj1fRSUQfCjhvnu1hqDMT7hzjzBBpi12nVniYD6").unwrap(),
                false 
            ),
            // "name": "program",
            // "isMut": false,
            // "isSigner": false
            AccountMeta::new_readonly(
                Pubkey::from_str("LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo").unwrap(),
                false 
            ),
            // tick address
            AccountMeta::new(
                Pubkey::from_str("6xReLXkmXTKvBTvPzQXmL6uyUKyXmjVKps19RRBe1R7X").unwrap(),
                false 
            ),
        ]


// 3.指令数据
// 我们在不使用RS时,Meteora Dlmm指令数据结构体长这样(在swap.ts中提到过)
pub struct MeteoraDlmmIxD {
    pub discriminator: [u8; 8],
    pub amount_in: u64,
    pub minAmount_out: u64,
}

// 但是当我们想通过RS使用比例swap功能时,你需要传递的结构体长这样
pub struct RsMeteoraDlmmIxD {
  pub rs_discriminator:[u8;8],
  pub discriminator: [u8; 8],
  pub amount_in: u64,
  pub minAmount_out: u64,
}

// 您发现了吗?  RS的本质就是套娃🤣🤣🤣 
// 也正因如此,潜在可能的BUG将微乎其微(如果您发现BUG请发邮给我 非常感谢!.)
// 那么我们想使用RS,只需要知道 rs_discriminator 这个字段就行了.!
// 它长这样👇
rs_discriminator = [
                    7,  // 必填项 ata_account_index  您想按比例修改的目标ATA账户,在账户数组中的下标,
                    13, // 必填项 payer_index 您的支付账号,在账户数组中的下标
                    3,  // 必填项 skip_count  您想跳过账户数组的开头前几个 在本例中就是3个,可以拉到上面,账户数组和指令数据结合着看
                    1,  // 必填项 system_program_index 需要invoke系统程序,在账户数组中的下标,
                    2,  // 必填项 author_index 这是我的收款账户,用来赚取咖啡钱,在账户数组中的下标,
                    0,  // 必填项 target_dex_program_index 目标DEX,在账户数组中的下标,
                    0,  // 预留填充位随便填 不需要管它
                    0,  // 预留填充位随便填 不需要管它
                  ],
// 需要说明的是,所有index结尾的 是从0开始记数(它是数组麻,)
// skip_count则是由1开始记数(它是数量麻)
// 至此 开篇综述所说的 "有点类似于ALT的索引方式(非ALT)将指令传递并转发给链上DEX" 也解释完毕.


// 如果这些内容对您有所帮助,请打款给 4vmGVyTVgHuZV4FK9GxRTRXMF27d22bASznSuaGeVg2M 这个地址,非常感谢您!.(多打点哈哈哈!!!!😈😈😈)
// Dear friends, Have fun!
