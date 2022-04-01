import {Avatar, Chip, Link} from  "@mui/material";
import {Link as ReachLink } from "@gatsbyjs/reach-router";

export default function TopicChip({name, count, size, ...props}) {
  return (
    <Link to={`/topics/${name}/`} style={{cursor: 'pointer'}}
      underline="none" component={ReachLink} {...props}
    >
      <Chip color="secondary" variant="outlined" label={name} size={size}
        avatar={count? <Avatar>{count}</Avatar>: null} style={{cursor: 'pointer'}}
      />
    </Link>
  )
}