import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Data
import data from "layouts/fb/components/Projects/data";

function Projects() {
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:8000/news/?symbol=META');
        const responseData = await response.json();
        const newsArticles = responseData.stories; 
        setNews(newsArticles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Refresh</MenuItem>
    </Menu>
  );

  const renderNews = () => {
    if (loading) {
      return <MDTypography variant="body2">Loading...</MDTypography>;
    } else if (!news || news.length === 0) {
      return <MDTypography variant="body2">No news articles found.</MDTypography>;
    }

    const truncateDescription = (description) => {
      if (!description) return '';
      
      const maxChars = 200; 
      let truncatedDescription = description.slice(0, maxChars);
      if (description.length > maxChars) {
        truncatedDescription += '...';
      }
      return truncatedDescription;
    };

    const renderFavicon = (siteUrl) => {
      const googleFaviconUrl = `http://www.google.com/s2/favicons?domain=${siteUrl}`;
      return (
        <img
          src={googleFaviconUrl}
          alt="Favicon"
          style={{ width: 30, height: 30, marginRight: 10 }}
          onError={(event) => event.target.src = 'default-favicon.png'}
        />
      );
    };

    const handleFaviconError = (event, siteUrl) => {
      event.target.onerror = null;
      event.target.src = `http://www.google.com/s2/favicons?domain=${siteUrl}`;
    };
    
    
    return news.map((article, index) => (
      <MDBox key={index} mb={2} display="flex" alignItems="center">
    {article.favicon_url ? (
      <img
        src={article.favicon_url}
        alt="Favicon"
        style={{ width: 70, height: 70, marginRight: 10 }}
        onError={(event) => handleFaviconError(event, article.site)}
      />
    ) : (
      renderFavicon(article.site)
    )}
        <MDBox>
          <MDTypography variant="h6">{article.title}</MDTypography>
          <MDTypography variant="body2">{truncateDescription(article.description)}</MDTypography>
          <MDTypography variant="body2">Source: {article.site}</MDTypography>
          <MDTypography variant="body2">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </MDTypography>
        </MDBox>
      </MDBox>
    ));
  };

  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h5" gutterBottom>
          Latest News
        </MDTypography>
        {renderNews()}
      </MDBox>
    </Card>
  );
}

export default Projects;
