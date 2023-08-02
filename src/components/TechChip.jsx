import {Avatar, Chip} from  "@mui/material";
import {Link} from "@gatsbyjs/reach-router";

export default function TechChip({name, count, size, ...props}) {
  return (
    <Chip color="secondary" variant="outlined" label={name} size={size}
      component={Link} to={`/technologies/${name}/`}
      avatar={count? <Avatar>{count}</Avatar>: null}
      style={{cursor: 'pointer', margin: '4px', textDecoration: 'none'}}
      {...props}
    />
  )
}