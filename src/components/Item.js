import React from 'react';
import {Feed, Icon, Label} from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom';

const Item = ({item}) => (
  <React.Fragment>
    <Feed size='large' style={{ borderBottom: '1px solid rgba(0, 0, 0, .2)', paddingBottom: 10 }}>
      <Feed.Event>
        <Feed.Label>
          <Label style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25 }}>
            {item.score}
          </Label>
        </Feed.Label>
        <Feed.Content style={{ marginLeft: 30 }}>
          <Feed.Summary>
            <a href={item.url}>{item.title}</a>
          </Feed.Summary>
          <Feed.Meta style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Feed.Label style={{ borderRight: '1px solid rgba(0,0,0,.4)', paddingRight: 10 }}>
              by
              &nbsp;
              <Link to={`/user/${item.by}`} style={{ textTransform: 'capitalize' }}>{item.by}</Link>
              &nbsp;
              {moment.unix(item.time).fromNow()}
            </Feed.Label>
            <Link to={`/items/${item.id}`}>
              <Icon name='comments outline' />
              {item.descendants} comments
            </Link>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  </React.Fragment>
);

export default Item;
