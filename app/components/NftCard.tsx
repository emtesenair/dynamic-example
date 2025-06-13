"use client";

import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import styles from "./NftCard.module.css";
import { useClaimNft } from "@/app/hooks/useClaimNft";
import { useState, useMemo, useEffect } from "react";

const TOKEN_IMAGES: { [key: number]: string } = {
  0: "/nfts/banana-rotten.png",
  1: "/nfts/banana-1.png",
  2: "/nfts/banana-2.png",
  3: "/nfts/banana-3.png",
};

export default function NftCard() {
  const { primaryWallet, setShowAuthFlow } = useDynamicContext();
  const { claim, loading, txHash, error } = useClaimNft();
  const [tokenId, setTokenId] = useState<bigint | null>(null);

  useEffect(() => {
    setTokenId(null);
  }, [error]);

  const handleMint = async () => {
    if (!primaryWallet) return;

    try {
      const response = await fetch("/api/random-token", {
        credentials: "include",
      });

      if (!response.ok) setTokenId(0n);

      const { randomNumber } = await response.json();
      setTokenId(BigInt(randomNumber));

      await claim({
        receiver: primaryWallet.address as `0x${string}`,
        tokenId: BigInt(randomNumber),
        quantity: 1n,
      });
    } catch (e) {
      setTokenId(null);
      console.error(e);
    }
  };

  const nftImage = useMemo(() => {
    if (txHash && tokenId !== null) return TOKEN_IMAGES[Number(tokenId)];
    return "/nfts/random-banana.gif";
  }, [tokenId, txHash]);

  return (
    <div className={styles.card}>
      {primaryWallet && <DynamicWidget />}
      <Image
        src={nftImage}
        alt="NFT Image"
        width={288}
        height={288}
        className={styles.nftImage}
      />
      {primaryWallet ? (
        <>
          <button
            className={styles.mintButton}
            onClick={handleMint}
            disabled={loading}
          >
            {loading ? "Minting..." : "Mint NFT"}
          </button>
          {txHash && (
            <p className={styles.txHash}>
              Success!{" "}
              <a
                href={`https://sepolia.basescan.org/tx/${txHash}`}
                target="_blank"
              >
                View transaction
              </a>
            </p>
          )}
          {error && <p className={styles.error}>Error: {error.message}</p>}
        </>
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
