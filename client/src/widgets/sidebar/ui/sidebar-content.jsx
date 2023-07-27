import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { StyledIconButton, FlexBox, ButtonMain } from '@shared/index';
import { useSearchParams } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const SidebarContent = ({ filters, handleSubmit, isModalOpened, closeModal }) => {
  const [searchFilter, setSearchFilter] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState(
    filters.map((filter) => {
      return { name: filter.name, items: [] };
    })
  );
  const [ordering, setOrdering] = useState('');
  const handleOrderingChange = (event) => {
    setOrdering(event.target.value);
  };

  const [resetFilters, setResetFilters] = useState(true);
  const [initialFilters, setInitialFilters] = useState(
    filters.map((filter) => {
      return { name: filter.name, items: [] };
    })
  );

  const handleAppliedFilters = (name, id) => {
    const newFilters = appliedFilters.map((f) => {
      if (f.name === name) {
        const currentIndex = f.items.indexOf(id);

        if (currentIndex === -1) {
          f.items.push(id);
        } else {
          f.items.splice(currentIndex, 1);
        }
      }
      return f;
    });

    setAppliedFilters(newFilters);
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(appliedFilters, searchFilter, ordering);
      }}
      sx={{
        display: { xs: isModalOpened ? 'flex' : 'none', sm: 'flex' },
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: { sm: '8rem' },
        width: '100%',
        height: { xs: '100svh', sm: 'calc(100svh - 60px)' },
        position: { xs: 'fixed', sm: 'relative' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'background.paper',
        zIndex: { xs: 10001, sm: 0 },
        right: '0',
        bottom: '0',
        py: 1,
        px: { xs: 2, sm: 0 },
      }}
    >
      <FlexBox
        sx={{
          display: { sm: 'none' },
          width: '100%',
          marginBottom: '1rem',
          justifyContent: 'flex-end !important',
        }}
      >
        <StyledIconButton onClick={closeModal}>
          <CloseIcon size="large" sx={{ color: 'text.primary', fontSize: '1.5rem' }} />
        </StyledIconButton>
      </FlexBox>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          overflowY: 'scroll',
          flex: '1 1 auto',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <TextField
          onChange={(e) => {
            setSearchFilter(e.target.value);
          }}
          id="filled-required"
          label="Search by name"
          variant="filled"
          color="text"
          fullWidth
          sx={{ boxSizing: 'bordered-box', mt: 1 }}
        />
        <FormControl variant="standard" fullWidth sx={{ mb: 2, mt: 1.3, zIndex: 10005 }}>
          <InputLabel id="demo-simple-select-standard-label" color="text">
            Ordering
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={ordering}
            onChange={handleOrderingChange}
            label="Ordering"
            sx={{ zIndex: 100005 }}
            color="text"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'name'}>Name (A-Z)</MenuItem>
            <MenuItem value={'-name'}>Name (Z-A)</MenuItem>
            <MenuItem value={'released'}>Released (Newest)</MenuItem>
            <MenuItem value={'-released'}>Released (Oldest)</MenuItem>
            <MenuItem value={'added'}>Added (Newest)</MenuItem>
            <MenuItem value={'-added'}>Added (Oldest)</MenuItem>
            <MenuItem value={'created'}>Created (Newest)</MenuItem>
            <MenuItem value={'-created'}>Created (Oldest)</MenuItem>
            <MenuItem value={'updated'}>Updated (Newest)</MenuItem>
            <MenuItem value={'-updated'}>Updated (Oldest)</MenuItem>
            <MenuItem value={'rating'}>Rating (From Highest)</MenuItem>
            <MenuItem value={'-rating'}>Rating (From Lowest)</MenuItem>
            <MenuItem value={'-metacritic'}>Metacritic (From Highest)</MenuItem>
            <MenuItem value={'metacritic'}>Metacritic (From Lowest)</MenuItem>
          </Select>
        </FormControl>
        {filters.map((filter) => (
          <FilterList
            key={filter.name.toLowerCase().replace(' ', '-')}
            name={filter.name}
            items={filter.items}
            handleAppliedFilters={handleAppliedFilters}
            resetFilters={resetFilters}
          />
        ))}
      </List>
      <Box sx={{ pt: 1, width: '100%', maxWidth: '360px' }}>
        <ButtonMain fullWidth type="submit" text="APPLY" sx={{ my: 0, py: 1, fontWeight: 600 }} />
        <Button
          fullWidth
          variant="text"
          color="inherit"
          sx={{ mt: 1, py: 0.5 }}
          onClick={() => {
            setAppliedFilters(initialFilters);
            setResetFilters(!resetFilters);
          }}
        >
          reset filters
        </Button>
      </Box>
    </Box>
  );
};

const FilterList = ({ name, items, handleAppliedFilters, resetFilters }) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    setChecked([]);
    setOpen(false);
  }, [resetFilters]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleToggle = (id) => () => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    handleAppliedFilters(name, id);
  };

  return (
    <Box>
      <ListItemButton sx={{ px: 0, py: 1 }} onClick={handleClick}>
        <ListItemText primary={name.replace('_', ' ').toUpperCase()} sx={{ pl: 0.1 }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item) => {
            const labelId = `checkbox-list-label-${item.id}`;
            return (
              <ListItem key={item.id} sx={{ p: 0, '.MuiListItemIcon-root': { gap: 0, minWidth: '10px' } }}>
                <ListItemButton role={undefined} onClick={handleToggle(item.id)} sx={{ px: 1 }} dense>
                  <ListItemIcon sx={{ '.MuiCheckbox-root': { py: 0.5 } }}>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(item.id) !== -1}
                      color="default"
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={item.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </Box>
  );
};
