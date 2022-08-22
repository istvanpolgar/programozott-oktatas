import {
    Card,
    CardContent,
    CardMedia,
    CardActions,
    CardActionArea
 } from '@mui/material';

import { styled } from '@mui/system';

export const NewCard = styled(Card)({
    position: "relative",
    borderRadius: 0
});

export const NewCardActionArea = styled(CardActionArea)({
    position: "relative"
});

export const NewCardActions = styled(CardActions)({
    position: "relative"
});

export const NewCardContent = styled(CardContent)({
    position: "relative",
    backgroundColor: "transparent"
});

export const NewCardMedia = styled(CardMedia)({
    position: "absolute",
    top: 0,
    right: 0,
    height: "100vh"
});

const NewCardElements = {
    NewCard,
    NewCardActionArea,
    NewCardActions,
    NewCardContent,
    NewCardMedia
};

export default NewCardElements;