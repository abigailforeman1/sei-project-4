# Generated by Django 2.2.9 on 2020-02-29 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0004_auto_20200228_1222'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='code_two',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
