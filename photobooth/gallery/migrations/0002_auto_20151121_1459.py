# -*- coding: utf-8 -*-
# Generated by Django 1.9c1 on 2015-11-21 14:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='file',
            field=models.FileField(upload_to='photos'),
        ),
    ]
