import MfaChallengeBox from './MfaChallengeBox';
import NewPassChallengeBox from './NewPassChallengeBox';
import PassResetChallengeBox from './PassResetChallengeBox';
import BaseChallengeBox from './BaseChallengeBox';

import DappbotAPI from '@eximchain/dappbot-api-client';
import User, { Challenges } from '@eximchain/dappbot-types/spec/user';

import React, { FC } from 'react';

export interface ChallengeBoxProps {
    API: DappbotAPI
    user: User.AuthData
    email: string
    challenge: Challenges.Data
    setUser: (user:User.AuthData)=>void
    setChallenge: (challenge: Challenges.Data)=>void
}

export const ChallengeBox: FC<ChallengeBoxProps> = ({ API, user, email, challenge, setUser, setChallenge }) => {
  switch (challenge.ChallengeName) {
    case Challenges.Types.NewPasswordRequired:
      return <NewPassChallengeBox API={API}
                user={user}
                challenge={challenge}
                setUser={setUser}
                setChallenge={setChallenge}/>
    case Challenges.Types.AppMfa:
    case Challenges.Types.SmsMfa:
      return <MfaChallengeBox API={API}
                user={user}
                challenge={challenge}
                setUser={setUser}
                setChallenge={setChallenge}/>
    case Challenges.Types.ForgotPassword:
      return <PassResetChallengeBox API={API}
                email={email}
                setChallenge={setChallenge} />
    default:
      const title = `Unrecognized Login Challenge Type '${challenge.ChallengeName}'`;
      return (
        <BaseChallengeBox title={title}
          errorMsg=''
          disabled={true} />
      )
  }
}

export default ChallengeBox;