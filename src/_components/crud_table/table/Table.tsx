import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Center, Heading, HStack, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { usePagination, useTable } from 'react-table';
import { defaultColumn } from './EditableCell';

export const DataTable = ({ columns, data, updateData, skipPageReset }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateData,
    },
    usePagination
  );

  if (data.length === 0) {
    return (
      <Center mt="5">
        <Heading as="h3">No hay ningún elemento</Heading>
      </Center>
    );
  }

  return (
    <Box my="4" mx="auto" maxW={{ base: '900px', xl: '1200px' }}>
      <Table {...getTableProps()} size={{ base: 'sm' }}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <HStack justify="center" my="4">
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<< '}
        </Button>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'< '}
        </Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'> '}
        </Button>
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>> '}
        </Button>
        <Text>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </Text>
        <Text>
          | Ir a página:{' '}
          <Input
            w="100px"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </Text>{' '}
        <Select
          w="auto"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </Select>
      </HStack>
    </Box>
  );
};
