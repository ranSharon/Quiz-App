import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import gotLogo from '../assets/got.jpg';
import friendsLogo from '../assets/friends.jpg';
import svLogo from '../assets/sv.png';

interface IProps {
    tvShow: string;
}

const useStyles = makeStyles({
    media: {
        height: 140,
    }
});

const TvShowCard: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    const [redirect, setRedirect] = useState(false);

    const getRoutePath = () => {
        switch (props.tvShow) {
            case 'Game Of Thrones':
                return '/gameOfThronesQuiz';
            case 'Friends':
                return '/friendsQuiz';
            case 'Silicon Valley':
                return '/siliconValleyQuiz';
            default:
                return '/'
        }
    };

    const getDescription = () => {
        switch (props.tvShow) {
            case 'Game Of Thrones':
                return 'Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for thousands of years.';
            case 'Friends':
                return 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.';
            case 'Silicon Valley':
                return 'Follows the struggle of Richard Hendricks, a Silicon Valley engineer trying to build his own company called Pied Piper.';
            default:
                return ''
        }
    };

    const getImgSrc = () => {
        switch (props.tvShow) {
            case 'Game Of Thrones':
                return gotLogo;
            case 'Friends':
                return friendsLogo;
            case 'Silicon Valley':
                return svLogo;
            default:
                return ''
        }
    };

    const getWikiUrl = () => {
        switch (props.tvShow) {
            case 'Game Of Thrones':
                return 'https://en.wikipedia.org/wiki/Game_of_Thrones';
            case 'Friends':
                return 'https://en.wikipedia.org/wiki/Friends';
            case 'Silicon Valley':
                return 'https://en.wikipedia.org/wiki/Silicon_Valley_(TV_series)';
            default:
                return 'https://en.wikipedia.org'
        }
    };

    const getFamousShowQuote = () => {
        switch (props.tvShow) {
            case 'Game Of Thrones':
                return 'Winter Is Coming';
            case 'Friends':
                return 'How you doin’?';
            case 'Silicon Valley':
                return 'This Guy F*uks';
            default:
                return ''
        }
    };

    if (redirect) {
        return <Redirect to={getRoutePath()}/>
    }
    return (
        <Card>
            <CardActionArea onClick={() => setRedirect(true)}>
                <CardMedia
                    className={classes.media}
                    src="img"
                    image={getImgSrc()}
                    title={getFamousShowQuote()}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.tvShow}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {getDescription()}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => window.open(getWikiUrl())}>
                    Learn More About The Show
                </Button>
            </CardActions>
        </Card>
    );
};

export default TvShowCard;