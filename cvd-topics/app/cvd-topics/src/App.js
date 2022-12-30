import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TopicsGridView from './components/TopicsGridView';

function App() {
  let nonce = null;
  if(document._cvd_topics && document._cvd_topics.nonce) {
    nonce = document._cvd_topics.nonce;
  }

  return (
    <div className="App">
      <TopicsGridView nonce={nonce}/>
    </div>
  );
}

export default App;
