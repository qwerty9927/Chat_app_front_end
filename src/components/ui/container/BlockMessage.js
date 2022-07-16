import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

function BlockMessage({ data, nameFriend, nameRoot, idRootUser }) {
  console.log(data)
  function convertTime(time) {
    const timeConvert = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    return timeConvert
  }
  return (
    <>
      {data.map((item, index) => {
        if (item.idAuthor === idRootUser) {
          return (
            <Box key={index} sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
              <Box sx={{ mr: 1 }}>
                <Typography
                  align='right'
                  sx={{
                    fontWeight: 'bold'
                  }}
                >
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      opacity: 0.5,
                      mr: 1
                    }}
                  >
                    {convertTime(item.Time)}
                  </Typography>
                  You
                </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{
                        bgcolor: '#2295ff',
                        p: 1,
                        pl: 2,
                        pr: 2,
                        borderRadius: 4,
                        borderTopRightRadius: 0,
                      }}
                    >
                      {item.Message}
                    </Typography>
                  </Box>
              </Box>
              <Avatar>{nameRoot.split('')[0]}</Avatar>
            </Box>
          )
        } else {
          return (
            <Box key={index} sx={{
              display: 'flex',
            }}>
              <Avatar>{nameFriend.split('')[0]}</Avatar>
              <Box sx={{ ml: 1 }}>
                <Typography
                  align='left'
                  sx={{
                    fontWeight: 'bold'
                  }}
                >
                  {nameFriend}
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      opacity: 0.5,
                      ml: 1
                    }}
                  >
                    {convertTime(item.Time)}
                  </Typography>
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{
                      bgcolor: '#292b33',
                      p: 1,
                      pl: 2,
                      pr: 2,
                      borderRadius: 4,
                      borderTopLeftRadius: 0
                    }}
                  >
                    {item.Message}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        }
      })}
    </>
  )
}

export default BlockMessage
