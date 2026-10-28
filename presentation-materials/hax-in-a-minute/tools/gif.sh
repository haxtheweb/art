#!/bin/sh
# GIFs for chat, READMEs and social posts. Run from this folder after `npm run mp4`.
set -e
M=../media
# 1) the whole piece, 960px wide at 12 fps, from the MP4
ffmpeg -y -loglevel error -i $M/hax-in-a-minute.mp4 -vf "fps=12,scale=960:-1:flags=lanczos,split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" $M/hax-in-a-minute.gif
# 2) a seamless 4 s loop of the rockets cruising through the falling stars
node render.js video ../media/.liftoff.mp4 '{"fps":25,"w":960,"afterEnd":[4,8],"ff":["-c:v","libx264","-crf","10","-pix_fmt","yuv444p"]}'
ffmpeg -y -loglevel error -i $M/.liftoff.mp4 -vf "split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" -loop 0 $M/hax-lift-off-loop.gif
rm -f $M/.liftoff.mp4
