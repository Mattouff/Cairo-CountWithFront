'use client'
import { useEffect } from 'react';
import { StarknetProvider } from "@/components/starknet-provider";
import CounterButton from "@/components/CounterButton";
import ConnectButton from "@/components/ConnectButton";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBalance, useConnect } from "@starknet-react/core";

export default function App() {
  const { connect, connectors, error: connectError } = useConnect();
  const account = connectors[0]?.account;
  const { data: balance, error: balanceError } = useBalance({ address: account || undefined });

  const handleConnect = () => {
    connect();
  };

  useEffect(() => {
    if (connectError) {
      console.error('Erreur lors de la connexion au wallet :', connectError);
    }
    if (balanceError) {
      console.error('Erreur lors de la récupération de la balance :', balanceError);
    }
  }, [connectError, balanceError]);

  return (
    <StarknetProvider>
      <div className="container mx-auto p-4">
        <ConnectButton />
        <Button onClick={handleConnect} className="mb-4">
          {account ? `Connecté : ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connecter Wallet'}
        </Button>

        {account && (
          <Card>
            <CardContent>
              <p><strong>Adresse :</strong> {account}</p>
              <p><strong>Balance :</strong> {balance ? `${balance.formatted} ETH` : 'Chargement...'} </p>
            </CardContent>
          </Card>
        )}

        <h1 className="text-2xl font-bold mt-6">Starknet Counter</h1>
        <CounterButton />
      </div>
    </StarknetProvider>
  );
}