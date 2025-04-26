import {Connection,PublicKey,Keypair,Transaction,TransactionInstruction,sendAndConfirmTransaction,ComputeBudgetProgram,LAMPORTS_PER_SOL,clusterApiUrl,SystemProgram} from '@solana/web3.js';
import * as borsh from 'borsh';
import { Schema } from 'borsh';
import { serialize } from 'borsh';
import bs58 from 'bs58';
import { getAssociatedTokenAddressSync, pause,  createSyncNativeInstruction,NATIVE_MINT,createAssociatedTokenAccountInstruction,TOKEN_PROGRAM_ID,getAccount} from '@solana/spl-token';


// ============================================= 请看这里一步步操作 =============================================
// 1.先去dev领水,

// 2.提供key
const payer = Keypair.fromSecretKey(bs58.decode(key));

// 3.不需要修改这里,完成上方[1,2]后直接 npx ts-node src/fuse.ts
const cheack_amount = "0"; 

// 4.运行观察结果,观察明白后,注释上方cheack_amount,打开这里cheack_amount;
// const cheack_amount = "12300000000"; 

// 注意:全篇代码能改动的只有上方的 payer 和 cheack_amount


// ======================================= 如果你在看代码的话 不需要看这部分 ======================================
class Config {
    PROGRAM_ID: PublicKey;
    connection: Connection;
    payer: Keypair;
    cheack_amount: bigint;
    data: Buffer;
    constructor(payer: Keypair, cheack_amount: string,connection:Connection) {
      this.PROGRAM_ID = new PublicKey("RSoojvmJQP1NRci479HQHKa4wF6TJKZsb2SZC6tKXFn");
      this.connection = connection;
      this.payer = payer;
      this.cheack_amount = BigInt(cheack_amount); 
      this.data = Buffer.alloc(8); 
      this.data.writeBigUInt64LE(this.cheack_amount); 
    }
  }
// ================================================ 程序入口点 ================================================
async function main() {
    
    // 都是模板代码没啥好看的,跳到中间核心部分就可以
    const config = new Config(payer,cheack_amount,new Connection(clusterApiUrl('devnet'), 'confirmed'));
    const tx = new Transaction();
    const wsolMint = new PublicKey("So11111111111111111111111111111111111111112");
    const wsolATA = getAssociatedTokenAddressSync(wsolMint,config.payer.publicKey,false);
    // const ataInfo = await config.connection.getAccountInfo(wsolATA);
    // console.log(ataInfo?.owner)
    let ataInfo;
    try {
        ataInfo = await getAccount(config.connection, wsolATA);
    } catch (_) {
        ataInfo = null;
    }
    if(ataInfo){
        tx.add(
            SystemProgram.transfer({
                fromPubkey: payer.publicKey,
                toPubkey: wsolATA,
                lamports: 0.1 * LAMPORTS_PER_SOL,
            })
        ),
        tx.add(
          createSyncNativeInstruction(wsolATA)
        )
    }
    else{
        tx.add(
            createAssociatedTokenAccountInstruction(
                payer.publicKey,
                wsolATA,
                payer.publicKey,
                NATIVE_MINT,
                TOKEN_PROGRAM_ID
            ),
            SystemProgram.transfer({
              fromPubkey: payer.publicKey,
              toPubkey: wsolATA,
              lamports: 0.1 * LAMPORTS_PER_SOL,
            }),
            createSyncNativeInstruction(wsolATA),
        );
    }
    
    
    // =============================== 核心代码 ===============================
    // SOLANA任何合约,每次交互都需要提供三个参数,且仅需要提供这三个参数,这很重要.这就是标准
    // 1.程序ID
    // 2.账户数组
    // 3.指令参数
    const ix = new TransactionInstruction({
        programId: config.PROGRAM_ID,
        keys: [
            // 这是调用保险丝的常量,账户数组第一个必须是fuse111111111111111111111111111111111111111,
            { pubkey: new PublicKey('fuse111111111111111111111111111111111111111'), isSigner: false, isWritable: false },
            // 第二个必须是你想保护的ATA账户
            { pubkey: wsolATA, isSigner: false, isWritable: true}, 
        ],
        // 指令参数必须是你想限制的最低余额
        data: config.data,
    });

    // 如果你想保护多个,那么就构造多个这样的ix
    tx.add(ix);


    // =============================== 核心代码 ===============================
    
    


    // 没啥好看的,就是发送交易打印日志
    try {
        const txhash = await sendAndConfirmTransaction(config.connection, tx, [payer], {
          commitment: 'confirmed',
          preflightCommitment: 'processed',
        });
        console.log(`✅ 通过保险丝 交易成功 Transaction Hash: ${txhash}`);
      
        const confirmedTx = await config.connection.getTransaction(txhash, {
          commitment: 'confirmed',
          maxSupportedTransactionVersion: 0,
        });
      
        if (confirmedTx?.meta?.logMessages) {
          console.log("Transaction Logs:");
          confirmedTx.meta.logMessages.forEach((log, index) => {
            console.log(`${index + 1}: ${log}`);
          });
        } else {
          console.log("No logs found in the confirmed transaction.");
        }
      } catch (e: any) {
        console.error("❌ 触发保险丝 回滚交易 Transaction failed:", e.message);
        if (e.transactionLogs) {
          console.log("Simulation Logs:");
          e.transactionLogs.forEach((log: string, index: number) => {
            console.log(`${index + 1}: ${log}`);
          });
        } else {
          console.log("No logs available from the failed transaction.");
        }
      }

    const balance = await config.connection.getBalance(config.payer.publicKey);
    const wbalance = await config.connection.getTokenAccountBalance(wsolATA)
    console.log("============================================================")
    console.log(`payer.Pubkey => ${payer.publicKey}\npayer.balance => ${balance} lamports.`)
    console.log(`wsolATA => ${wsolATA}\nwbalance => ${wbalance.value.amount} lamports.`)
    console.log(`cheack_amount => ${cheack_amount} lamports.`)
    console.log("============================================================")

}
  
main().catch(console.error);

// 当您尝试完保险丝后,或许心里会想
// "这不就是hello world"???"
// 本质上,弄清楚标准后,大部分调用都是hello world

// 如果没问题,让咱们去💫 swap.ts 💫
// 如果有问题,不需要看代码,直接上主网,按照自己的方式将【核心代码】部分和您自己的代码结合试试吧!




