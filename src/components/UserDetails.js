import React from 'react';
import { Container, Divider, Header, Icon, Table } from 'semantic-ui-react';
import moment from 'moment';
import dompurify from 'dompurify';

const UserDetails = ({ created, id, karma, about }) => {
  const sanitizer = dompurify.sanitize;

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
              <Table.Cell>{moment.unix(created).format('LLLL')}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Karma:</Table.Cell>
              <Table.Cell>{karma}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={2}>About:</Table.Cell>
              <Table.Cell>
                {about ? (
                  <div dangerouslySetInnerHTML={{ __html: sanitizer(about) }} />
                ) : (
                  '--'
                )}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </React.Fragment>
  );
};
export default UserDetails;
