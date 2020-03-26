import ClaimForm from '../components/claimform'
import Leaderboards from '../components/leaderboards'

const Index = ({ url: {query: { walletId } } }) => (
  <div>
    <Leaderboards id="global"/>
    <ClaimForm walletId={walletId}/>
  </div>
);
export default Index;
