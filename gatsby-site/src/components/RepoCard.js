import React from "react";
import {Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  }
}));

export default function RepoCard({repo}) {
  const classes = useStyles();

  return (
    <Card classes={{root: classes.root}}>
      <CardHeader title={repo.name} titleTypographyProps={{align: 'center'}}/>
      <CardContent>
        <Typography variant="body1">
          {repo.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
