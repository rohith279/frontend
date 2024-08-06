import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar shadow">
      <Typography variant="h6" className="sidebar-header ">
        Heading
      </Typography>
      <List>
        <ListItem button onClick={() => navigate('/new-project')}>
          <ListItemText primary="New Project +" />
        </ListItem>
        <Typography variant="body2" className="sidebar-subheader">
          Project Label
        </Typography>
        <ListItem button onClick={() => navigate('/project-1')}>
          <ListItemText primary="Project Label" />
        </ListItem>
        <ListItem button onClick={() => navigate('/project-2')}>
          <ListItemText primary="Project Label" />
        </ListItem>
        <ListItem button onClick={() => navigate('/project-3')}>
          <ListItemText primary="Project Label" />
        </ListItem>
        <ListItem button onClick={() => navigate('/project-4')}>
          <ListItemText primary="Project Label" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
