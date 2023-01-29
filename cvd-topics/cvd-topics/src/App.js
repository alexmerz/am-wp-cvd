import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
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
      <div>
        <a href="/wp-admin/edit-tags.php?taxonomy=cvd-topics" target="_blank" rel="noreferrer">CVD-Themen anlegen/verwalten</a>
      </div>
      <DndProvider backend={HTML5Backend}>
        <TopicsGridView nonce={nonce}/>
      </DndProvider>
    </div>
  );
}

export default App;
