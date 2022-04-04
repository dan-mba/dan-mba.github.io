import {Avatar, Chip} from  "@mui/material";
import {Link} from "@gatsbyjs/reach-router";

export default function TopicChip({name, count, size, ...props}) {
  return (
    <Link to={`/topics/${name}/`} style={{textDecoration: 'none'}}
      {...props}
    >
      <Chip color="secondary" variant="outlined" label={name} size={size}
        avatar={count? <Avatar>{count}</Avatar>: null} style={{cursor: 'pointer', margin: '4px'}}
      />
    </Link>
  )
}