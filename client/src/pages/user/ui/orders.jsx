import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Order } from '@entities/order/index';
import { ButtonMain } from '@shared/index';
import { LoadingProgress } from '@shared';
import { getUserFromLocalCookie } from '@entities/user/index';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const Orders = () => {
  const [expanded, setExpanded] = useState('panel1');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  document.title = `GAME STASH: Orders`;

  useEffect(() => {
    const getUser = async () => {
      const serverUrl = import.meta.env.VITE_SERVER_URL;

      try {
        const user = await getUserFromLocalCookie();

        const fetchedOrders =
          user &&
          (await fetch(
            `${serverUrl}/orders/?filters[$or][0][email][$eq]=${user.email}&filters[$or][1][userEmail][$eq]=${user.email}`,
            {
              method: 'GET',
            }
          ));
        const orders = await fetchedOrders.json();
        orders && setOrders(orders.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (isLoading) return <LoadingProgress />;

  if (orders.length < 1)
    return (
      <Box
        sx={{
          height: 'calc(100svh - 8.3rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: 10,
        }}
      >
        <Typography variant="h3">You have no orders yet</Typography>
        <ButtonMain
          sx={{
            maxWidth: {
              sm: '100%',
              md: '70%',
            },
            boxSizing: 'border-box !important',
          }}
          text="BROWSE GAMES"
          onClick={() => navigate('/games')}
        />
      </Box>
    );

  return (
    <div>
      {orders.toReversed().map((order, index) => {
        const panelId = index + 1;
        return (
          <Accordion
            expanded={expanded === `panel${panelId}`}
            onChange={handleChange(`panel${panelId}`)}
            key={order.id}
          >
            <AccordionSummary aria-controls={`panel${panelId}d-content`} id={`panel${panelId}d-header`}>
              <Typography>
                #{order.id} ({order.attributes.items.length} items)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Order order={order.attributes} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};
