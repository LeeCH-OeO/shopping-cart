import{ useState } from 'react';
import{ useQuery } from 'react-query';
import Item from './Item/Item';
import Cart from './cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import Badge from '@material-ui/core/Badge';
import { AppBar, Typography } from '@material-ui/core';
import  IconButton  from "@material-ui/core/IconButton";
import { Toolbar } from '@material-ui/core';



//types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}
const getProducts = async (): Promise<CartItemType[]> =>
  await(await fetch('https://fakestoreapi.com/products')).json();


const App = ()=>{

  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const {data,isLoading,error} = useQuery<CartItemType[]>('product', getProducts)


  const getTotalItems = (items: CartItemType[]) => items.reduce((ack: number, item)=> ack + item.amount, 0)

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // Is the item already added in the cart ?
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if(isItemInCart){
        return prev.map(item =>(
          item.id === clickedItem.id? {...item, amount:item.amount+1} : item
        ))
      }
      // First time added
      return [...prev, {...clickedItem, amount: 1}]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev=>(
      prev.reduce((ack, item)=> {
        if(item.id === id){
          if(item.amount === 1) return ack;
          return[...ack, {...item, amount: item.amount-1}]
        }else {
          return[...ack,item]
        }
      },[] as CartItemType[])
    ))
  }

  if(isLoading) return<LinearProgress />
  if(error) return<div>error :(</div>


  return (
    <div>
      <AppBar position='sticky'>
        <Toolbar>
          <Drawer anchor= 'left' open={cartOpen} onClose= {()=> setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
      </Drawer>
      <IconButton onClick= {() => setCartOpen(true)} color="inherit">
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <ShoppingCartSharpIcon />
        </Badge>
      </IconButton><Typography variant="subtitle1" >購物網站</Typography>
      
      </Toolbar>        
      </AppBar>
      <p></p>      
      <Grid container spacing={2}>
        { data?.map(item => (
          <Grid item key={item.id} xs={12} sm={2}>
            <Item item = {item} handleAddToCart= {handleAddToCart}/>
          </Grid>
        )) }
      </Grid>
      <p></p>
      <footer >
          <a href="https://github.com/LeeCH-OeO/shopping-cart" target="_blank" rel="noreferrer">
              <Typography align="center" color="textSecondary" gutterBottom >
          ©LeeCH-OeO 
          </Typography></a>         
          </footer>
    </div>
  );
}

export default App;
