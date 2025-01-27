const TaskCard = ({ title, titleColor, userTasks, totalTasks}: TaskCardProps) => {
  return (
    <div className="basis-[32%] bg-darkBlue p-6 my-2 lg:my-0">
      <h2 className={`text-xl font-bold ${titleColor || 'text-white'}`}>{ title }</h2>
      <h3 className="text-lg pt-3">{ userTasks } / { totalTasks }</h3>
    </div>
  );
};

export default TaskCard;