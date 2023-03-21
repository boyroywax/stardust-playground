import { stardust, Player } from '@stardust-gg/web-sdk';
import React, { useEffect, useState } from 'react';

//interface Player {
//  id: string;
//  image: string;
//}

const GAME_ID = 1573; // Your gameID

export const Playground: React.FC = () =>  {
  const [user, setUser] = useState<Player | null>();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const user = await stardust.initialize({
          logoUrl: 'https://your-logo.svg',
          gameId: GAME_ID,
          
        });
        setUser(user);
      } catch (e) {
        console.log(e);
      }
      setInitializing(false);
    })();
  }, [setUser]);

  if (initializing) {
    return <>Loading...</>;
  }

  return (
    <div style={{ display: 'flex' }}>
      {!user ? (
        <button
          onClick={async () => {
            setUser(await stardust.login());
          }}
        >
          Login
        </button>
      ) : (
        <>
          <button
            onClick={async () => {
              setUser(await stardust.logout());
            }}
          >
            Logout
          </button>
          <img
            style={{ marginLeft: 10 }}
            height="24"
            src={user.image}
            alt="avatar"
          />
        </>
      )}
    </div>
  );
}