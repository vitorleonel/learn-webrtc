import React, { useEffect, useState, useRef } from 'react';
import Peer from 'peerjs';

import {
  Container,
  CallEmpty,
  CallVideo,
  CallForm,
  CallInput,
  CallButton,
} from './styles';

function App() {
  const video = useRef();

  const [myId] = useState(Math.round(Math.random() * 100));
  const [anotherId, setAnotherId] = useState(null);

  const [peer, setPeer] = useState(null);
  const [currentCall, setCurrentCall] = useState(null);

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  useEffect(() => {
    if (!myId) {
      return;
    }

    const start = async () => {
      const connection = new Peer(myId, {
        config: {
          iceServers: [
            { urls: ['stun:sp-turn2.xirsys.com'] },
            {
              username:
                '3zDPRXjGJOkxBEkxZsQecQYYqbs_ffA57SudoXn5qCWH2kx_lCSunX615aghB1CqAAAAAF62MXR2aXRvcmxlb25lbA==',
              credential: '8cd7e9a4-91ad-11ea-8565-0242ac120004',
              urls: [
                'turn:sp-turn2.xirsys.com:80?transport=udp',
                'turn:sp-turn2.xirsys.com:3478?transport=udp',
                'turn:sp-turn2.xirsys.com:80?transport=tcp',
                'turn:sp-turn2.xirsys.com:3478?transport=tcp',
                'turns:sp-turn2.xirsys.com:443?transport=tcp',
                'turns:sp-turn2.xirsys.com:5349?transport=tcp',
              ],
            },
          ],
        },
      });

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      connection.on('call', (call) => {
        call.answer(stream);

        call.on('stream', setRemoteStream);
        call.on('close', () => setRemoteStream(null));

        setCurrentCall(call);
      });

      setLocalStream(stream);
      setPeer(connection);
    };

    start();
  }, [myId]);

  useEffect(() => {
    if (!localStream && !remoteStream) {
      return;
    }

    video.current.srcObject = remoteStream || localStream;
  }, [localStream, remoteStream]);

  async function makeCall(event) {
    event.preventDefault();

    const call = peer.call(anotherId, localStream);

    call.on('stream', setRemoteStream);
    call.on('close', () => setRemoteStream(null));

    setCurrentCall(call);
  }

  async function closeCall(event) {
    event.preventDefault();

    if (!remoteStream) {
      return;
    }

    currentCall.close();
    setRemoteStream(null);
  }

  return (
    <Container>
      <CallVideo ref={video} autoPlay />

      <CallForm
        onSubmit={(event) =>
          !remoteStream ? makeCall(event) : closeCall(event)
        }
      >
        {!remoteStream && (
          <CallInput
            placeholder="Qual o id do outro usuário?"
            onChange={(event) => setAnotherId(event.target.value)}
          />
        )}

        <CallButton className={remoteStream && 'in_call'}>
          {!remoteStream ? 'Ligar' : 'Desligar'} ({myId})
        </CallButton>
      </CallForm>

      {!!!remoteStream && (
        <CallEmpty>
          <p>Nenhum outro participante aqui com você :(</p>
        </CallEmpty>
      )}
    </Container>
  );
}

export default App;
