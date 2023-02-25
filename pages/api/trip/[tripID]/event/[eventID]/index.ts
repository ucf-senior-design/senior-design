import { NextApiRequest, NextApiResponse } from 'next';

function findEventIndex(intervals: any, eventID: string) {
    let i;
    for (i = 0; i < intervals.length; i += 1) {
        const [start, end, uid] = intervals[i]
        if (uid === eventID)
            break;
    }
    if (i === intervals.length)
        return -1
    return i;
}

function mergeIntervals(intervals: any, eventID: string) {
    const indexToRemove: number = findEventIndex(intervals, eventID);
    if (indexToRemove === -1) {
        return -1
    }
    
    let result = [[intervals[0][0], intervals[0][1]]]
    const length: number = intervals.length
    for (let i = 1; i < length; i+= 1) {
        if (intervals[i][0] <= result[result.length - 1][1]) {
            result[result.length - 1][1] = Math.max(result[result.length - 1][1], intervals[i][1])
        } else {
            result.push(intervals[i])
        }
    }
    return result.length;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
const tripID = req.query.tripID as string;
const eventID = req.query.tripID as string; // event to reschedule
  switch (req.method) {

    case 'PUT': {
        const newInterval = req.body.newInterval
        
        try {
            // Get events from firebase and translate date to intervals
            // ***QUERY HERE***
            const intervals: any = []

            const length = mergeIntervals(intervals, eventID);

            if (length === -1 || length === intervals.length) {
                res.status(400).send('Conflict found. Can\'t reschedule.');
            } else {
                try {
                    // *** UPDATE EVENT START AND END TIME HERE ***
                    // const docRef = doc(firebaseDatbase, "Trips", tripID);
                    // await updateDoc(docRef, {
                    //     start: newInterval.start,
                    //     end: newInterval.end
                    // });
                    // }
                    // res.status(200).send(docRef.id);
                } catch (e) {
                    res.status(400).send('Error when updating team.');
                }
                res.status(200).send('👍');
            }
            
        } catch (e) {
            res.status(400).send('Error when executing trip query.');
        }
      break;
    }

  }
}
