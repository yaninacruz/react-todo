import React from 'react';

const CompletedItemsList = ({ completedTasks }) => {
    return (
        <div>
        <ul>
            {completedTasks.map((task) => (
                <li key={task.id}>{task.title}</li>
            ))}
        </ul>
        </div>
    );
};

export default CompletedItemsList;