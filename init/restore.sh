#!/bin/bash
set -e

echo "🚀 Initializing multiple databases and restoring dumps..."

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE activity_wonders;
  CREATE DATABASE blog_wonders;
  CREATE DATABASE countries_wonders;
  CREATE DATABASE quiz_wonders;
  CREATE DATABASE user_wonders;
EOSQL

echo "📥 Restoring activity.sql into activity_wonders"
psql -U "$POSTGRES_USER" -d activity_wonders -f /activity.sql

echo "📥 Restoring blog.sql into blog_wonders"
psql -U "$POSTGRES_USER" -d blog_wonders -f /blog.sql

echo "📥 Restoring country.sql into countries_wonders"
psql -U "$POSTGRES_USER" -d countries_wonders -f /country.sql

echo "📥 Restoring quiz.sql into quiz_wonders"
psql -U "$POSTGRES_USER" -d quiz_wonders -f /quiz.sql

echo "📥 Restoring user.sql into user_wonders"
psql -U "$POSTGRES_USER" -d user_wonders -f /user.sql

echo "✅ All databases restored!"
