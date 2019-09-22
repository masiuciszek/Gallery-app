import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import styled from 'styled-components';
import media from 'styled-media-query';
import { cl } from '../styled/GlobalStyle';
import { BtnPrimary } from '../styled/Button';

const Experience = ({ experience }) => {
  const exps = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
        )}
      </td>
      <td>
        <BtnPrimary>Delete</BtnPrimary>
      </td>
    </tr>
  ));
  return (
    <>
      <h2>Experience Credentials</h2>
      <Table>
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{exps}</tbody>
      </Table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};
// TODO fix the responsivness
export const Table = styled.table`
  margin: 2rem 0;
  background-color: none;
  width: 70%;
  border: 2px solid black;
  text-align: left;
  border-collapse: collapse;
  box-shadow: 2px 2px 1px 1px #ccc;
  th {
    background: ${cl.dark};
    color: ${cl.white}
    font-size: 1.7rem;
  }
  table,
  td,
  th {
    padding: 1.5rem;
  }
  td,
  th {
    border: 1px solid ${cl.white};
  }
  td {
    font-size: 1.5rem;
  }
  ${media.lessThan('small')`
    display: flex;
    flex-direction:column;
    flex-wrap: wrap;
      /* .hide-sm{
        display: none;
      } */
      button{
        display: none;
      }
  `}
`;
export default Experience;
