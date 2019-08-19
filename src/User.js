import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Divider, Header, Icon, Table } from 'semantic-ui-react';
import Moment from 'react-moment';

const User = ({ created, id, karma, submitted }) => {
  const ids = submitted;
  console.log(ids, 'IDS');

  return (
    <React.Fragment>
      <Container>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="info circle" />
            Details
          </Header>
        </Divider>

        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>User:</Table.Cell>
              <Table.Cell style={{ textTransform: 'capitalize' }}>
                {id}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Created:</Table.Cell>
              <Table.Cell>
                <Moment format="DD/MM/YYYY">{created}</Moment>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Karma:</Table.Cell>
              <Table.Cell>{karma}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={2}>About:</Table.Cell>
              <Table.Cell>
                <Link to={`/userComments`}>Comments</Link>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </React.Fragment>
  );
};
export default User;
