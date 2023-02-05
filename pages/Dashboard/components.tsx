import Event from '../../components/Dashboard/Event';
import JoinableEvent from '../../components/Dashboard/JoinableEvent';
import { Event as EventType } from '../../utility/types/trip';
/**
 * Delete Later: Just to prevent merge conflicts and display components
 */
export default function Dashboard() {
  const sEvent: EventType = {
    uid: 'uid',
    title: 'title',
    attendees: ['jane doe', 'john doe', 'amy', 'bob'],
    duration: {
      start: new Date(),
      end: new Date(),
    },
    location: 'location',
    description: 'the description goes here',
  };
  return (
    <div>
      <Event event={sEvent} />
      <JoinableEvent event={sEvent} />
    </div>
  );
}
