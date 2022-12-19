import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TopicsViewGrid from './components/TopicsGridView';

const topics = [
  {
    post_title: 'Topic 1',
    meta_topic_id: "897dsvs98ds8",
    posts: [
      {
        ID: 1,
        post_title: 'Post 1_1',
        post_status: 'draft'
      },
      {
        ID: 2,
        post_title: 'Post 1_2',
        post_status: 'published',
      }
    ]
  },
  {
    post_title: 'Topic 2',
    meta_topic_id: '897dsvs9dfspjfslkds8',
    posts: [
      {
        ID: 3,
        post_title: 'Post 2_1',
        post_status: 'draft'
      },
      {
        ID: 4,
        post_title: 'Post 2_2',
        post_status: 'published',
      }
    ]
  },
  {
    post_title: 'Topic 3',
    meta_topic_id: "89asddsa7dsvs98ds8",
    posts: [
      {
        ID: 5,        
        post_title: 'Post 3_1',
        post_status: 'draft'
      },
      {
        ID: 6,        
        post_title: 'Post 3_2',
        post_status: 'published',
      }
    ]
  },
  {
    post_title: 'Topic 4',
    meta_topic_id: '897dfhh9dfspjfslkds8',
    posts: [
      {
        ID: 7,        
        post_title: 'Post 4_1',
        post_status: 'draft'
      },
      {
        ID: 8,        
        post_title: 'Post 4_2',
        post_status: 'published',
      }
    ]
  }    
]

function App() {
  return (
    <div className="App">
      <TopicsViewGrid topics={topics} />
    </div>
  );
}

export default App;
