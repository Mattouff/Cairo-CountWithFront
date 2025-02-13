import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const ConnectButton = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setError(null);
      } catch (error) {
        console.error('Erreur lors de la connexion au wallet :', error);
        setError('Impossible de se connecter au wallet.');
      }
    } else {
      setError('Veuillez installer un wallet compatible Avalanche Core comme MetaMask.');
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Connexion au Wallet</CardTitle>
        <CardDescription>Connectez votre wallet Avalanche pour continuer.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={connectWallet}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition duration-300"
        >
          {account ? `Connecté : ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connecter Wallet'}
        </Button>

        {account && (
          <div className="mt-4 text-center">
            <Badge variant="outline" className="text-green-600 border-green-600">
              Connecté
            </Badge>
            <p className="mt-2 text-sm text-gray-500">Adresse : {account}</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default ConnectButton;