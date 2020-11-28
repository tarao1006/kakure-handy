import React, { useContext, useState } from 'react';
import { AuthContext } from '@contexts';
import { Typography } from '@atoms';
import { Loading } from '@molecules';
import { NewTableTemplate } from '@templates';
import { getAvailableRoom } from '@api';
import { Room } from '@model';
import rooms from '@dataset/room.json';

export const NewTable = () => {
  const { currentUser } = useContext(AuthContext);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  React.useEffect(() => {
    let cleanedUp = false;
    const fetch = async () => {
      setIsLoading(true);
      if (!cleanedUp) {
        if (currentUser) {
          const token = await currentUser.getIdToken();
          const res = await getAvailableRoom(token);
          if (res.length === 0) {
            setIsError(true);
          }
          setAvailableRooms(rooms.filter(room => res.includes(room.id)));
        }
      }
      setIsLoading(false);
    }
    fetch();
    return () => {
      cleanedUp = true;
    };
  }, [currentUser]);

  return (
    <>
      {isLoading && <Loading />}
      {isError && <Typography variant="h5" style={{textAlign: 'center'}}>空きがありません</Typography>}
      {availableRooms.length !== 0 &&<NewTableTemplate availableRooms={availableRooms} />}
    </>
  )
}
