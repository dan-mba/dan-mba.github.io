import {Badge, Card, CardContent, CardHeader, Typography} from "@mui/material";
import {Code, StarOutlineRounded} from "@mui/icons-material";
import {Link} from "gatsby-theme-material-ui";
import IconTooltip from "./IconTooltip";
import {card, header, content, star, badge, spacer} from "./ContribCard.module.css";

export default function ContribCard({repo}) {
  

  return (
    <Card className={card}>
      <CardHeader className={header}
        title={repo.name}
        titleTypographyProps={{align: 'center', variant: 'h5'}}
        subheader={repo.descriptionEmoji}
        subheaderTypographyProps={{align: 'center', color: 'secondary', variant: 'body1'}}
        action={
          <IconTooltip title="code repository" url={repo.url}
            icon={<Code/>} style={{padding: '0 12px 6px'}}
          />
        }
        avatar={
          <Badge badgeContent={repo.stargazerCount} max={9999}
            aria-label={`${repo.stargazerCount} stars`}
            className={badge}
          >
            <StarOutlineRounded color="secondary" className={star}/>
          </Badge>
        }
      />
      <CardContent className={content}>
        {!repo.contributionPrs ? null : 
          <div>
            <Typography variant="h6" align="center">Pull Requests</Typography>
            {repo.contributionPrs.map((r,i) => (
              <Link key={i} underline="hover" href={r.url}
                target="_blank" rel="noreferrer noopener"
              >
                <Typography variant="body1">
                  {r.title}
                </Typography>
              </Link>
            ))}
          </div>
        }
        {repo.contributionPrs && repo.contributionIssues ?
          <div className={spacer}/> : null
        }
        {!repo.contributionIssues ? null : 
          <div>
            <Typography variant="h6" align="center">Issues</Typography>
            {repo.contributionIssues.map((r,i) => (
              <Link key={i} underline="hover" href={r.url}
                target="_blank" rel="noreferrer noopener"
              >
                <Typography variant="body1">
                  {r.title}
                </Typography>
              </Link>
            ))}
          </div>
        }
      </CardContent>
    </Card>
  );
}
