"use client";

import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import styles from "./NftCard.module.css";

export default function NftCard() {
  const { primaryWallet, setShowAuthFlow } = useDynamicContext();

  const handleMint = () => {
    console.log("minting nft");
  };

  return (
    <div className={styles.card}>
      {primaryWallet && <DynamicWidget d />}
      <Image
        src="/nfts/random-banana.gif"
        alt="NFT Image"
        width={288}
        height={288}
        className={styles.nftImage}
      />
      {primaryWallet ? (
        <button className={styles.mintButton} onClick={handleMint}>
          Mint NFT
        </button>
      ) : (
        <button
          className={styles.mintButton}
          onClick={() => setShowAuthFlow(true)}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
