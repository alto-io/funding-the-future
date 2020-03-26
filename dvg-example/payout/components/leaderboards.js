import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { render } from 'react-dom'
import theme from '../theme.js'
import { ThemeProvider } from 'emotion-theming'
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Link,
  Image,
  Card,
} from 'rebass'
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn
} from "@devexpress/dx-react-grid-bootstrap4";

import getSessionToken from '../api/GetSessionToken'
import getLeaderboard from '../api/getLeaderboard'

const Leaderboards = (props) => {

  const [table, setTable] = useState(null)

  useEffect( () => {
    async function fetchData() {
      const t = await getSessionToken()
      const rowData = await getLeaderboard(props.id, t)

      setTable(
        {
          columns: [
            { name: "rank", title: "rank"},
            { name: "username", title: "User Name" },
            { name: "score", title: "Score" },
          ],
          rows: rowData
       }
      )
    }
    fetchData()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Heading color='primary'>
        ID: {props.id}
      </Heading>
      {
        table &&
        <Grid rows={table.rows} columns={table.columns}>
          <Table />
         <TableHeaderRow />
        </Grid>
      }
    </ThemeProvider>
  )

}

export default Leaderboards
