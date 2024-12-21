import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import CodeIcon from '@mui/icons-material/Code';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const SideNav = () => {
  const navigate = useNavigate();

  const tools = [
    { name: 'Base64 Converter', icon: <CodeIcon />, path: '/base64-converter' },
    { name: 'JSON Formatter', icon: <ImageIcon />, path: '/json-formatter' },
    { name: 'Home', icon: <HomeIcon />, path: '/' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', minHeight: '100vh' },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {tools.map((tool) => (
              <ListItem button key={tool.name} onClick={() => navigate(tool.path)}>
                <ListItemIcon>{tool.icon}</ListItemIcon>
                <ListItemText primary={tool.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main content section */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          minHeight: '100vh', // Ensure the main content area fills the height of the viewport
          overflow: 'auto',
        }}
      >
        {/* Content goes here */}
      </Box>
    </Box>
  );
};

export default SideNav;
